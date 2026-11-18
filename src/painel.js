const mqtt = require ('mqtt') 

const cliente = mqtt.connect('mqtt://localhost:1884') 



cliente.on('connect', () => { 
    return new Promise((resolve, reject)=>{
    console.log('Conectado ao MQTT!')

    
        cliente.subscribe( 
            'laboratorio/sala1/temperatura', 
            {qos: 0}, 
            (erro) => { 
                if(erro){
                    reject('Erro ao assinar tópico', erro)
                    return 
                }
                resolve('Assinatura realizada!')
            }
        
    )})
})


cliente.on('message', (topico, mensagem) => {
    const leitura = JSON.parse(mensagem.toString())
    if(leitura.temperatura > 28){
        console.log('Alerta: temperatura ALTA!',leitura.timestamp, leitura.sensorID, leitura.temperatura)

    }
    else if(leitura.temperatura < 18){
        console.log('Alerta: temperatura BAIXA!', leitura.timestamp, leitura.sensorID, leitura.temperatura)
    }
    else{
    
    console.log('Temperatura normal: ', leitura.timestamp, leitura.sensorID, leitura.temperatura)
    }
})

cliente.on('error', (erro) => { 
    console.log('Erro MQTT', erro.message)
})

cliente.on('reconnect', () => { 
    console.log('Tentando reconexão...')
})