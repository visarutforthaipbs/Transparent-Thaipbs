# 💸 เงินภาษีเราไปไหนบ้าง? #งบสื่อสาธารณะ2567

โปรเจกต์นี้นำเสนอข้อมูลงบประมาณสื่อสาธารณะไทย ปี 2567 (2024) ในรูปแบบ data visualization สุดชิค 🔥 เพื่อให้เห็นว่าเงินภาษีของพวกเราถูกนำไปใช้ยังไงบ้าง

## ✨ ฟีเจอร์เด็ดๆ

- Interactive Treemap แสดงการจัดสรรงบประมาณแบบเห็นภาพรวมได้ในคลิกเดียว
- Hover เพื่อดูรายละเอียดแต่ละรายการว่าเงินหลายร้อยล้านหายไปไหน
- Dark mode design สุดคูล พร้อม UI ที่ออกแบบสำหรับทุกอุปกรณ์

## 🛠️ เทคโนโลยีที่ใช้

- HTML5 / CSS3 ด้วย custom design
- Plotly.js สำหรับ data visualization แบบโต้ตอบได้
- Font Awesome สำหรับไอคอนต่างๆ
- Google Font (Kanit) ออกแบบให้เข้ากับภาษาไทย

## 👀 ลองใช้งานดู

1. Clone repo นี้มาไว้ที่เครื่อง
2. เปิดไฟล์ index.html ในเบราว์เซอร์ หรือรัน web server แบบง่ายๆ:
   ```
   python -m http.server 8000
   ```
   แล้วเข้าที่ http://localhost:8000 ในเบราว์เซอร์

## 📊 ไฮไลท์ข้อมูล

การ visualize นี้แสดงข้อมูลที่น่าสนใจเกี่ยวกับงบประมาณสื่อสาธารณะไทย:

- 38% ของงบประมาณใช้ไปกับการผลิตคอนเทนต์ (ข่าว, สารคดี, บันเทิง)
- เงินกว่า 742 ล้านบาท ถูกใช้เป็นค่าใช้จ่ายบุคลากร
- งบประมาณด้านไอทีและเทคโนโลยีรวมกันกว่า 628 ล้านบาท
- มีการลงทุนด้าน Big Data และระบบวิเคราะห์ข้อมูลเพียง 42 ล้านบาท

## 💬 เกี่ยวกับโปรเจกต์

DataTransparency เป็นโปรเจกต์ที่มุ่งหวังให้คนรุ่นใหม่เข้าใจการใช้งบประมาณภาครัฐและสื่อสาธารณะได้ง่ายขึ้น หวังว่าการนำเสนอข้อมูลในรูปแบบที่เข้าถึงง่ายจะช่วยให้ทุกคนเห็นภาพรวมและตั้งคำถามกับการใช้เงินภาษีของเราได้มากขึ้น

ติดตามและแชร์โปรเจกต์นี้ได้ที่: #งบสื่อสาธารณะ #DataTransparency #ภาษีของเรา

# Thai PBS Budget Transparency

An interactive visualization of the Thai PBS budget with a public idea submission feature and word cloud visualization.

## Features

- Budget allocation visualization using interactive treemaps
- Information about Thai PBS and budget comparison with other public broadcasters
- Public idea submission system with word cloud visualization
- MongoDB integration for storing and retrieving public ideas

## Tech Stack

- Frontend: HTML, CSS, JavaScript, D3.js, Plotly.js, d3-cloud
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Deployment: Render

## Local Development

1. Clone the repository:

```
git clone [your-repository-url]
cd thaipbs-budget-transparency
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/yourdatabase
```

4. Start the development server:

```
npm run dev
```

5. Open http://localhost:3000 in your browser

## Deploying to Render

### Option 1: Deploy via GitHub Integration

1. Push your code to a GitHub repository

2. Log in to [Render Dashboard](https://dashboard.render.com/)

3. Click "New" and select "Web Service"

4. Connect your GitHub repository

5. Configure the deployment:

   - Name: thaipbs-budget-transparency (or your preferred name)
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

6. Add the environment variable:

   - MONGODB_URI = [your MongoDB connection string]

7. Click "Create Web Service"

### Option 2: Deploy via Render Blueprint

1. Push your code with the `render.yaml` file to GitHub

2. Log in to [Render Dashboard](https://dashboard.render.com/)

3. Click "New" and select "Blueprint"

4. Connect your GitHub repository

5. Render will automatically configure the deployment based on your `render.yaml`

6. Add the MONGODB_URI secret environment variable in the Render dashboard

## Security Notes

- Ensure your MongoDB connection string is stored securely as an environment variable
- Never commit the `.env` file to your GitHub repository
- Consider IP whitelisting for your MongoDB Atlas cluster

## Updating the Visualization

The word cloud will automatically update as users submit new ideas. The data is stored in MongoDB and retrieved via API endpoints.
