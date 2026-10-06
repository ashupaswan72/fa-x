files = {
    'src/components/common/Navbar.jsx': [
        ('className="h-10 rounded shadow-sm"', 'className="h-14 w-14 rounded-full shadow-sm object-cover"')
    ],
    'src/components/common/Footer.jsx': [
        ('className="h-10 rounded shadow-sm"', 'className="h-14 w-14 rounded-full shadow-sm object-cover"')
    ],
    'src/layouts/AdminLayout.jsx': [
        ('className="h-12 w-auto bg-white rounded-md p-1 shadow-sm"', 'className="h-16 w-16 bg-white rounded-full p-1 shadow-sm object-cover"')
    ],
    'src/layouts/SellerLayout.jsx': [
        ('className="h-12 w-auto bg-white rounded-md p-1 shadow-sm"', 'className="h-16 w-16 bg-white rounded-full p-1 shadow-sm object-cover"'),
        ('className="h-8 w-auto bg-white rounded shadow-sm"', 'className="h-12 w-12 bg-white rounded-full p-0.5 shadow-sm object-cover"')
    ],
    'src/pages/auth/Login.jsx': [
        ('className="h-16 mx-auto rounded shadow-sm mb-4"', 'className="h-24 w-24 mx-auto rounded-full shadow-md mb-4 object-cover"')
    ],
    'src/pages/auth/Register.jsx': [
        ('className="h-16 mx-auto rounded shadow-sm mb-4"', 'className="h-24 w-24 mx-auto rounded-full shadow-md mb-4 object-cover"')
    ]
}

for file_path, replacements in files.items():
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old_str, new_str in replacements:
        content = content.replace(old_str, new_str)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
