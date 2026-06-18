import re
with open(r"c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB\contacto.html", "r", encoding="utf-8") as f:
    html = f.read()

# Extract script blocks
scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
for i, script in enumerate(scripts):
    with open(f"test_script_{i}.js", "w", encoding="utf-8") as f:
        f.write(script)
