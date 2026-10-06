import re
import os

files = ['src/pages/auth/Login.jsx', 'src/pages/auth/Register.jsx']
for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'import logoImg from' not in content:
        content = content.replace("import { useAuth }", "import logoImg from '../../assets/logo.jpg';\nimport { useAuth }")
    
    content = re.sub(r'<span className=\"text-4xl\">.*?</span>', '<img src={logoImg} alt="FA-X Logo" className="h-16 mx-auto rounded shadow-sm mb-4" />', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
