
Testing the API Endpoints
POST = https://sim-6iwp.onrender.com/api/sims/activate
{ "simNumber": "<your_sim_number>" }

POST = https://sim-6iwp.onrender.com/api/sims/deactivate
Body: { "simNumber": "<your_sim_number>" }

GET = https://sim-6iwp.onrender.com/api/sims
GET /api/sims/phone/<phone_number>

host locally 

1) git clone
2) open the root directory
3) use this commannd : cd frontend 
4) then : npm install
5) use this commannd : cd backend
6) then : npm install
7) npm run build
8) npm start
9) open the local host 5000
