const form = document.querySelector('#formulario')

form.addEventListener('submit', cadastraVeiculo)

function cadastraVeiculo(e) {
    e.preventDefault()
    
    const modeloCarro = document.querySelector('#modeloCarro').value
    const placaCarro = document.querySelector('#placaCarro').value
    const time = new Date()

    if (!modeloCarro  || !placaCarro) {
        alert('Preencha Modelo e Placa')
        return
    }

    const carro = {
        modeloCarro,
        placaCarro,
        entrada: `${time.getHours()}:${time.getMinutes()} - ${time.getDate()} / ${time.getMonth()} / ${time.getFullYear()}`      
    }

   if (localStorage.getItem("patio") === null) {
       const carros = []
       carros.push(carro)
       localStorage.setItem("patio", JSON.stringify(carros))
   } else {
       const carros = JSON.parse(localStorage.getItem("patio"))
       carros.push(carro)
       localStorage.setItem("patio", JSON.stringify(carros))
   }
   
   form.reset()

   mostraPatio()

}

function excluirVeiculo(placa) {
    const carros = JSON.parse(localStorage.getItem("patio"))
    
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].placaCarro === placa) {
            carros.splice(i, 1)
        }
        localStorage.setItem("patio", JSON.stringify(carros))
    }
    mostraPatio()

}

function mostraPatio() {
    const carros = JSON.parse(localStorage.getItem("patio"))
    const tabelaCarros = document.querySelector('#resultados')

    tabelaCarros.innerHTML = ''

    for (let i = 0; i < carros.length; i++) {
        const modelo = carros[i].modeloCarro
        const placa = carros[i].placaCarro
        const entrada = carros[i].entrada

        tabelaCarros.innerHTML += `<tr><td>${modelo}</td><td>${placa}</td><td>${entrada}</td><td><button class="btn btn-danger" onclick="excluirVeiculo('${placa}')">Excluir</button></td></tr>`
    }
}