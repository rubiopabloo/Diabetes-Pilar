import os
import glob
import re

directory = r"c:\Users\Usuario\Desktop\UB VIRTUAL\DIABETESPILARWEB"
html_files = glob.glob(os.path.join(directory, "*.html"))
py_files = glob.glob(os.path.join(directory, "*.py"))

files = html_files + py_files

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    original_content = content
    
    # 1. Remove Cookies link
    # E.g.: 
    # Or: 
    content = re.sub(r'<span class="footer-sep">\|</span>\s*', '', content)
    content = re.sub(r'\s*<span class="footer-sep">\|</span>', '', content)
    content = re.sub(r'', '', content)
    
    # 2. Remove Shopping Cart button
    content = re.sub(r'\s*', '', content)
    content = re.sub(r'\s*', '', content)
    
    # Write back if changed
    if content != original_content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated general items in {os.path.basename(filepath)}")

# 3. Change text color in contacto.html
contacto_path = os.path.join(directory, "contacto.html")
if os.path.exists(contacto_path):
    with open(contacto_path, "r", encoding="utf-8") as f:
        contacto = f.read()
    
    old_text = '<p style="font-size: 16px; color: #475569; max-width: 600px; margin: 0 auto; line-height: 1.5;">Es importante que completes estos datos para poder brindarte una atención más personalizada.</p>'
    new_text = '<p style="font-size: 16px; color: #FFFFFF; max-width: 600px; margin: 0 auto; line-height: 1.5;">Es importante que completes estos datos para poder brindarte una atención más personalizada.</p>'
    
    if old_text in contacto:
        contacto = contacto.replace(old_text, new_text)
        with open(contacto_path, "w", encoding="utf-8") as f:
            f.write(contacto)
        print("Updated color in contacto.html")

# 4. Update the card in sobre-nosotros.html
sobre_path = os.path.join(directory, "sobre-nosotros.html")
if os.path.exists(sobre_path):
    with open(sobre_path, "r", encoding="utf-8") as f:
        sobre = f.read()
    
    old_card_style = 'background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 25px 30px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.25); color: #ffffff; font-size: 13px; max-width: 680px; width: 100%; flex-shrink: 0; box-shadow: 0 15px 35px rgba(0,0,0,0.3);'
    new_card_style = 'background: linear-gradient(135deg, rgba(2, 136, 209, 0.95), rgba(79, 195, 247, 0.85)); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 25px 30px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); color: #ffffff; font-size: 13px; max-width: 680px; width: 100%; flex-shrink: 0; box-shadow: 0 15px 35px rgba(2,136,209,0.4);'
    
    if old_card_style in sobre:
        sobre = sobre.replace(old_card_style, new_card_style)
        with open(sobre_path, "w", encoding="utf-8") as f:
            f.write(sobre)
        print("Updated card in sobre-nosotros.html")
    else:
        print("Could not find the exact style for the card in sobre-nosotros.html")
