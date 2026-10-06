import os
import re

# 1. Update Navbar.jsx
navbar_path = 'src/components/common/Navbar.jsx'
with open(navbar_path, 'r', encoding='utf-8') as f:
    navbar = f.read()

if 'import logoImg from' not in navbar:
    navbar = navbar.replace('import { useAuth }', 'import logoImg from \'../../assets/logo.jpg\';\nimport { useAuth }')

navbar = re.sub(r'<div className="bg-\[#4CAF50\] p-1\.5 rounded-lg shadow-sm">[\s\S]*?<Leaf className="w-5 h-5 text-white fill-white" />[\s\S]*?</div>[\s\S]*?<div className="flex flex-col">[\s\S]*?<span className="text-2xl font-black text-\[#11311F\] tracking-tighter leading-none">FA-X</span>[\s\S]*?<span className="text-\[8px\] font-bold tracking-\[0\.2em\] text-\[#4CAF50\] uppercase mt-0\.5">Farm Access</span>[\s\S]*?</div>', '<img src={logoImg} alt="FA-X Logo" className="h-10 rounded shadow-sm" />', navbar)

with open(navbar_path, 'w', encoding='utf-8') as f:
    f.write(navbar)

# 2. Update Footer.jsx
footer_path = 'src/components/common/Footer.jsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    footer = f.read()

if 'import logoImg from' not in footer:
    footer = footer.replace('import { Link }', 'import logoImg from \'../../assets/logo.jpg\';\nimport { Link }')

footer = re.sub(r'<div className="bg-\[#4CAF50\] p-1\.5 rounded-lg">[\s\S]*?<Leaf className="w-5 h-5 text-white fill-white" />[\s\S]*?</div>[\s\S]*?<div className="flex flex-col">[\s\S]*?<span className="text-2xl font-black text-white tracking-tighter leading-none">FA-X</span>[\s\S]*?<span className="text-\[8px\] font-bold tracking-\[0\.2em\] text-\[#4CAF50\] uppercase mt-0\.5">Farm Access</span>[\s\S]*?</div>', '<img src={logoImg} alt="FA-X Logo" className="h-10 rounded shadow-sm" />', footer)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(footer)

# 3. Update AdminLayout.jsx
admin_path = 'src/layouts/AdminLayout.jsx'
with open(admin_path, 'r', encoding='utf-8') as f:
    admin = f.read()

if 'import logoImg from' not in admin:
    admin = admin.replace('import { motion, AnimatePresence }', 'import logoImg from \'../../assets/logo.jpg\';\nimport { motion, AnimatePresence }')

admin = re.sub(r'<div className="flex items-center">[\s\S]*?<span className="text-3xl font-black tracking-tighter italic">FAX</span>[\s\S]*?<Leaf className="w-5 h-5 ml-0\.5 -mt-2 rotate-12" fill="white" />[\s\S]*?</div>[\s\S]*?<span className="text-\[9px\] tracking-\[0\.1em\] font-medium leading-none -mt-1 opacity-90">Farm Access Exchange</span>', '<img src={logoImg} alt="FA-X Logo" className="h-12 w-auto bg-white rounded-md p-1 shadow-sm" />', admin)

with open(admin_path, 'w', encoding='utf-8') as f:
    f.write(admin)

# 4. Update SellerLayout.jsx
seller_path = 'src/layouts/SellerLayout.jsx'
with open(seller_path, 'r', encoding='utf-8') as f:
    seller = f.read()

if 'import logoImg from' not in seller:
    seller = seller.replace('import { useAuth }', 'import logoImg from \'../../assets/logo.jpg\';\nimport { useAuth }')

seller = re.sub(r'<div className="flex items-center">[\s\S]*?<span className="text-3xl font-black tracking-tighter italic">FA-X</span>[\s\S]*?<Leaf className="w-6 h-6 ml-0\.5 -mt-2 rotate-12" fill="white" />[\s\S]*?</div>[\s\S]*?<span className="text-\[10px\] tracking-wider font-medium leading-none mt-1 opacity-90">Farm Access Exchange</span>', '<img src={logoImg} alt="FA-X Logo" className="h-12 w-auto bg-white rounded-md p-1 shadow-sm" />', seller)

seller = re.sub(r'<div className="flex items-center gap-1 text-\[#0A6C35\] font-black text-xl italic tracking-tighter">[\s\S]*?FA-X <Leaf className="w-4 h-4 -mt-1 rotate-12" fill="currentColor" />[\s\S]*?</div>', '<img src={logoImg} alt="FA-X Logo" className="h-8 w-auto bg-white rounded shadow-sm" />', seller)

with open(seller_path, 'w', encoding='utf-8') as f:
    f.write(seller)

print("All logo patches applied.")
