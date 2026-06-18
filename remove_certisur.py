import os
import glob
import re

directory = r"c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB"
html_files = glob.glob(os.path.join(directory, "*.html"))
py_files = glob.glob(os.path.join(directory, "*.py"))

files = html_files + py_files

# Patterns to remove
pattern_img = re.compile(r'<div[^>]*title="Haga Click para Verificar[^>]*>\s*<a[^>]*Seal_Certificado[^>]*>\s*<img[^>]*CURS-3\.0\.png[^>]*>\s*</a>\s*</div>', re.IGNORECASE)
pattern_img2 = re.compile(r'<a[^>]*Seal_Certificado[^>]*>\s*<img[^>]*CURS-3\.0\.png[^>]*>\s*</a>', re.IGNORECASE)
pattern_script = re.compile(r'<script[^>]*JavaScript-Seal-v3\.0\.js[^>]*>\s*</script>', re.IGNORECASE)

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = pattern_img.sub("", content)
    new_content = pattern_img2.sub("", new_content)
    new_content = pattern_script.sub("", new_content)

    if content != new_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file_path)}")
