const express = require("express");
import { Request, Response } from "express";
const app = express();
const porta = 3000
app.use(express.json())

let id_universal = 1

app.listen(porta, () => {
    console.log(`Servidor está rodando na porta: ${porta}`)
})

interface Link{
    id: number,
    url_antiga: string,
    new_url: string
}

class Encurtador {
    links: Link[] = []

    criar(link: Link){
        this.links.push(link)
    }

    retrieve(id: number){
        return this.links.find(link => link.id === id)
    }

    retrieveAll(): Link[]{
        return this.links
    }

    length(): number{
        return this.links.length
    }

    verifica_url_antiga(link: Link): number{
        for(let i=0; this.links.length; i++){
            if(this.links[i].url_antiga === link.url_antiga){
                return this.links[i].id
            }
        }
        return -1
    }
}
let id_teste = 1
let id_teste2 = 2
let link1: Link = {id: id_teste, url_antiga: "https://www.google.com/search?q=aliexpress&rlz=1C1VDKB_pt-PTBR1062BR1062&oq=aliexpress&gs_lcrp=EgZjaHJvbWUqDAgAEAAYQxjjAhiKBTIMCAAQABhDGOMCGIoFMg8IARAuGEMYxwEY0QMYigUyCQgCEAAYQxiKBTIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIECAcQBdIBCDIxNjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8", new_url: `http://localhost:3000/u/${id_teste}`}
let link2: Link = {id: id_teste2, url_antiga: "https://www.google.com/search?q=aliexpress&rlz=1C1VDKB_pt-PTBR1062BR1062&oq=aliexpress&gs_lcrp=EgZjaHJvbWUqDAgAEAAYQxjjAhiKBTIMCAAQABhDGOMCGIoFMg8IARAuGEMYxwEY0QMYigUyCQgCEAAYQxiKBTIHCAMQABiABDIHCAQQABiABDIHCAUQABiABDIHCAYQABiABDIECAcQBdIBCDIxNjdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8", new_url: `http://localhost:3000/u/${id_teste2}`}
let e1: Encurtador = new Encurtador()
e1.criar(link1)
e1.criar(link2)

app.get("/",  (req: Request, res: Response) =>{
    const all_links = e1.retrieveAll()

    res.json(all_links)
})

app.get("/:id",  (req: Request, res: Response) =>{
    let id = parseInt(req.params.id)
    const link = e1.retrieve(id)
    
    if(!link){
        res.status(404).json({ error: "Não existe esse id!" })
    }else{
        res.json(link)
    }
})

app.get("/u/:id", (req: Request, res: Response) =>{
    let id = parseInt(req.params.id)
    const link = e1.retrieve(id)

    if(!link){
        res.status(404).json({ error: "Não existe esse url!" })
    }else{
        res.json(link.url_antiga)
    }

})

app.post("/", (req: Request, res: Response) =>{
    const url_antiga: string = req.body.url_antiga
    const id = id_universal
    const new_url = `http://localhost:${porta}/u/${id}`

    const link: Link = {
        id,
        url_antiga,
        new_url
    }

        if(url_antiga.trim() == ""){
            res.status(400).json({mensagem: "Envie uma URL válida"})
        }else{
            if(new_url.length > url_antiga.length){
                res.status(404).json({mensagem: "A URL gerada é maior ou igual à original"})
            }else{
                    e1.criar(link)
                    res.status(200).json(link)
                    id_universal++
                }
            } 
})