import subprocess

result = subprocess.run(['node', '-v'], capture_output=True, text=True)
print("Node version:", result.stdout)

result2 = subprocess.run(['python', '-m', 'py_compile', 'extract_js.py'], capture_output=True, text=True)

# Let's write a small node script and run it using the browser or something?
# No node installed. Let's use python to parse javascript syntax?
import re

with open(r"c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB\contacto.html", "r", encoding="utf-8") as f:
    html = f.read()

scripts = re.findall(r'<script>(.*?)</script>', html, re.DOTALL)
for i, script in enumerate(scripts):
    print(f"Script {i} length:", len(script))

