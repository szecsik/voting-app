
const id = window.location.pathname.slice(0,window.location.pathname.length-6);
const vote = new Answer()

const labels = []
const scores = []
let question

vote.getVotes(id).then((data)=>{

question=data.question[0].question
const results = data.answers[0]

console.log(data.answers[0])
results.forEach((ans)=>{

labels.push(ans.vote);
scores.push(ans.score)

})}).then(()=>{
document.getElementById("quest").innerHTML=question;


var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Votes',
            data: scores,
            backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(255, 206, 86)',
                'rgba(75, 192, 192)',
                'rgba(153, 102, 255)',
                'rgba(255, 159, 64)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});





})
