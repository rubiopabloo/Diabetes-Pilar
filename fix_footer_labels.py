import os, glob

folder = r'c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB'
html_files = glob.glob(os.path.join(folder, '*.html'))

old = 'Aviso Legal</a>'
new = 'Términos y Condiciones</a>'

for f in html_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if old in content:
        content = content.replace(old, new)
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        print(f'Updated: {os.path.basename(f)}')
print('Done')
