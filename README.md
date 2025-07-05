quiz-app/
│
├── public/                 # File tĩnh (favicon, ảnh ngoài, index.html)
│
├── src/                    # Mọi mã nguồn chính nằm trong đây
│   ├── assets/             # Ảnh, icon, font, v.v.
│   ├── components/         # Component dùng lại được (button, navbar, card...)
│   ├── layouts/            # Layout chung (MainLayout, AdminLayout...)
│   ├── pages/              # Từng trang cụ thể (Home, About, Quiz, Dashboard...)
│   ├── routes/             # Cấu hình định tuyến React Router
│   ├── services/           # API calls (axios, fetch)
│   ├── hooks/              # Custom React Hooks
│   ├── store/              # Redux/Zustand hoặc Context API (nếu dùng)
│   ├── utils/              # Hàm tiện ích dùng chung
│   ├── App.jsx             # Gốc của React App
│   └── main.jsx            # Điểm vào chính (render root)
│
├── .env                   # Biến môi trường (API URL, keys...)
├── .gitignore
├── index.html             # Entry HTML (dùng trong Vite)
├── package.json
└── vite.config.js / cra config
