from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64 

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

device = "cuda"
model_id = "SG161222/Realistic_Vision_V1.3"
pipe = StableDiffusionPipeline.from_pretrained(model_id, revision="main", torch_dtype=torch.float16)
pipe.to(device)

@app.get("/")
def generate(prompt: str, Nprompt: str, inference: int): 
    with autocast(device): 
        image = pipe(prompt=[prompt] * 2, negative_prompt=[Nprompt] * 2, guidance_scale=8.5, num_inference_steps=inference).images[0]
    image.show()
    image.save("testimage.png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64encode(buffer.getvalue())

    return Response(content=imgstr, media_type="image/png")

  
import nest_asyncio
from pyngrok import ngrok
import uvicorn
!ngrok config add-authtoken 2OOjnLNtbhW4HOD69RcZtMloWbP_3Jm6hbLi3DN2StK9dZK37
ngrok_tunnel = ngrok.connect(8000)
print('Public URL:', ngrok_tunnel.public_url)
nest_asyncio.apply()
uvicorn.run(app, port=8000)
