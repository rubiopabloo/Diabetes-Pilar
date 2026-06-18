import re
import sys

def check_html(path):
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    
    print("Checking buttons...")
    for btn in re.findall(r'<button[^>]*>', html):
        if "onclick" in btn:
            print("Found onclick:", btn)

check_html(r"c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB\contacto.html")
