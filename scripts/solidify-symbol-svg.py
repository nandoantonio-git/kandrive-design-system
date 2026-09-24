import re, sys, os
BASE = "#F3F3F3"  # Neutral/Surface/Background (Light)
def solidify(path):
    s = open(path).read()
    if 'kd-solid' in s: return 'skip(already)'
    if not re.search(r'(fill-opacity|stop-opacity|opacity)="0?\.\d+"|rgba\(|mix-blend', s): return 'skip(opaque)'
    key = re.sub(r'[^a-z0-9]', '', os.path.basename(path).lower().replace('.svg',''))
    sid, fid = f'kd-symbol-{key}', f'kd-solid-{key}'
    m = re.search(r'<svg\b[^>]*>', s); head_end = m.end()
    body = s[head_end:s.rindex('</svg>')]
    defs = ''.join(re.findall(r'<defs\b.*?</defs>', body, re.S))
    content = re.sub(r'<defs\b.*?</defs>', '', body, flags=re.S)
    table = ' '.join(['0'] + ['1'] * 49)
    filt = (f'<filter id="{fid}" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">'
            f'<feFlood flood-color="{BASE}" result="c"/>'
            f'<feMorphology in="SourceAlpha" operator="erode" radius="0.4" result="m"/>'
            f'<feComponentTransfer in="m" result="a"><feFuncA type="discrete" tableValues="{table}"/></feComponentTransfer>'
            f'<feComposite in="c" in2="a" operator="in"/></filter>')
    new_defs = f'<defs>{filt}</defs>'
    out = (s[:head_end]
           + '\n<!-- Base opaca (Neutral/Surface/Background Light): o símbolo fica igual no Light e no Dark (2026-09-24). -->\n'
           + new_defs + defs
           + f'<use href="#{sid}" filter="url(#{fid})"/>'
           + f'<g id="{sid}">{content}</g>\n</svg>\n')
    open(path, 'w').write(out)
    return 'ok'
for p in sys.argv[1:]:
    print(os.path.basename(p), solidify(p))
