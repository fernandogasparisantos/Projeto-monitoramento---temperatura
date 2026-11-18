const mqtt = require('mqtt')

const cliente = mqtt.connect('mqtt://localhost:1884')

cliente.on('connect', () => {
    console.log('Publicador conectado!')

    const loop = setInterval(()=>{
        
        const leitura = {
            sensorID: 'sensor-sala-01',
            temperatura: Number((10 + Math.random() * 30).toFixed(1)),
            unidade: 'C',
            timestamp: new Date().toLocaleDateString(),
            status: 'ligado'
        }

        const payload = JSON.stringify(leitura)

        cliente.publish(
            'laboratorio/sala1/temperatura',
            payload,
            {qos: 1},
            erro => {
                if(erro){

                    console.error('Erro ao publicar', erro)
            }
                else{
                    console.log('Mensagem enviada', payload)
                    
                    
                }
                
            }

        )

    },3000)
})