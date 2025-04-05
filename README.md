# Backend project for Bucket application
## How to start application
## How to start database
- URI -> mongodb://localhost:27017

gcloud run deploy be-bucket \
  --source . \
  --region europe-west8 \
  --set-env-vars "MONGO_URI=mongodb+srv://wlankasper:Laryokkk_9.9@cluster-bucket.s7rve.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-bucket"