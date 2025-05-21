import styles from './Dashboard.module.css'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart, Doughnut, Line } from 'react-chartjs-2'
import ButtonType from '../../components/Atoms/ButtonType/ButtonType'

const Dashboard = ()=>{

    // Adoções realizadas com sucesso
    const successfulAdoptionMonth = [12, 9, 6, 2, 8, 18, 8, 9, 11, 10, 16, 19]

    // Pets devolvidos
    const returnedAdoptionPets = [0, 5, 7, 4, 2, 5, 8, 9, 3, 1, 2, 3]

    // Quantidade de Pets Resgatados
    const qtdeRescuedPetMonth = [2, 5, 8, 3, 9, 10, 5, 2, 6, 3, 4, 6]

    // Espécies de Pet - Espécies mais adotadas
    const petSpecies = ["Cachorro", "Gato", "Hamster", "Papagaio"]
    const colorPetSpecies = ['#D14D72', 'rgb(255, 217, 0)', 'rgb(0, 110, 255)', 'rgb(0, 124, 37)']

    // Espécies de Pet
    const qtdePetSpecies = [9, 7, 3, 5]

    // Espécies mais adotadas
    const qtdeAdoptedPetSpecies = [3, 9, 2, 6]

    // Idade dos Pets
    const petsAge = [3, 9, 2, 6]



    return(
        <div className={styles.dashboard}>

                <div className={styles.total_dashboard}>
                    <div className={styles.total_info}>
                        <h3>Número de pets</h3>
                        <h1>10</h1>
                    </div>
                    <div className={styles.total_info}>
                        <h3>Número de adotantes</h3>
                        <h1>10</h1>
                    </div>
                    <div className={styles.total_info}>
                        <h3>Pets em situação extrema</h3>
                        <h1>10</h1>
                    </div>
                    <div className={styles.total_info}>
                        <h3>Pets Especiais</h3>
                        <h1>10</h1>
                    </div>
                    <div className={styles.total_info}>
                        <h3>Pets Vacinados</h3>
                        <h1>10</h1>
                    </div>
                </div>

                <div className={styles.row_cards_dashboard}>
                    <div className={styles.big_card_dashboard}>
                        <h2>Gráfico de adoções realizadas por mês</h2>
                        
                        <div className={styles.big_graph}>
                        <Line
                            data={{
                                labels: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],

                                datasets: [
                                    {
                                        label: "Adoções realizadas com sucesso",
                                        data: successfulAdoptionMonth,
                                        backgroundColor: "#060FF0",
                                        borderColor: "#060FF0",
                                        pointBorderWidth: 2,
                                    },
                                    {
                                        label: "Pets devolvidos",
                                        data: returnedAdoptionPets,
                                        backgroundColor: "#FF3030",
                                        borderColor: "#FF3030",
                                        pointBorderWidth: 2,
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                        </div>
                    </div>

                    <div className={styles.big_card_dashboard}>
                    <h2>Pets salvos/resgatados por mês</h2>
                    
                    <div className={styles.big_graph}>
                        <Bar
                            data={{
                                
                                labels: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
                                
                                datasets: [
                                    {
                                        label: 'Quantidade de pets salvos',
                                        
                                        data: qtdeRescuedPetMonth,
                                        barPercentage: 0.5,
                                        backgroundColor: [
                                            '#D14D72',
                                        ],
                                        borderRadius: 5,
                                        
                                    },
                                    
                                ],
                                
                            }}
                            
                            options= {{
                                responsive: true,
                                scales: {
                                    x: { beginAtZero: true },
                                    y: { beginAtZero: true }
                                },
                                plugins:{
                                    legend:{
                                        display: false
                                    }
                                },
                                maintainAspectRatio: false
                            }}
                        />
                        </div>
                    </div>
                </div>

               
            <div className={styles.row_cards_dashboard}>

                <div className={styles.card_dashboard}>
                    <h2>Espécies de Pets</h2>
                    <div className={styles.circle_graph}>
                        <Doughnut
                            data={{
                                labels: petSpecies.map(species => species),
                                datasets: [
                                    {
                                        data: qtdePetSpecies,
                                        barPercentage: 0.2,
                                        backgroundColor: [
                                            '#D14D72',
                                            'rgb(255, 217, 0)',
                                            'rgb(0, 110, 255)',
                                            'rgb(0, 124, 37)'
                                        ]
                                    },
                                    
                                ],
                                
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                
                </div>

                <div className={styles.card_dashboard}>
                    <h2>Espécies de Pet mais Adotados</h2>
                    <div className={styles.circle_graph}>
                        <Doughnut
                            data={{
                                labels: petSpecies,
                                datasets: [
                                    {
                                        data: qtdeAdoptedPetSpecies,
                                        barPercentage: 0.2,
                                        backgroundColor: colorPetSpecies
                                    },
                                    
                                ],
                                
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                
                </div>

                <div className={styles.card_dashboard}>
                    <h2>Quantidade de Pets por idade</h2>
                    <div className={styles.circle_graph}>
                        <Doughnut
                            data={{
                                labels: ["Filhote (0 a 6 meses)", "Jovem (6 meses a 2 anos)", "Adulto (2 a 7 anos)", "Senior (acima de 7 anos)"],
                                
                                datasets: [
                                    {
                                        data: petsAge,
                                        barPercentage: 0.2,
                                        backgroundColor: [
                                            '#D14D72',
                                            'rgb(255, 217, 0)',
                                            'rgb(0, 110, 255)',
                                            'rgb(0, 124, 37)'
                                        ]
                                    },
                                    
                                ],
                                
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                
                </div>
            </div>
            
            <div id={styles.look_button_space}>
                 <ButtonType type="button">Gerar Relatório</ButtonType>
            </div>
           
        </div>
    )
}

export default Dashboard