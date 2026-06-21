let chart;

const aliceMessages = [
"おはようございます♪ 今日も健康への冒険を始めましょう！",
"素晴らしいです✨ 継続こそ最強のスキルです。",
"あと少しでレベルアップです！頑張りましょう！",
"運動記録を確認しています...健康状態は良好です。",
"今日も未来の自分のために経験値を稼ぎましょう！"
];

function getTitle(level){

```
if(level >= 50) return "伝説の勇者";
if(level >= 40) return "健康マスター";
if(level >= 30) return "脂肪討伐隊長";
if(level >= 20) return "熟練冒険者";
if(level >= 10) return "見習い冒険者";

return "運動初心者";
```

}

function calculateStats(weight, training, cardio){

```
return {
    str: Math.max(10, Math.floor(training / 3)),
    vit: Math.max(10, Math.floor((100 - weight))),
    agi: Math.max(10, Math.floor(cardio / 3)),
    int: 10 + Math.floor((training + cardio) / 20)
};
```

}

function createChart(history){

```
const ctx =
    document
    .getElementById("weightChart")
    .getContext("2d");

if(chart){
    chart.destroy();
}

chart = new Chart(ctx,{
    type:"line",
    data:{
        labels: history.map(x => x.date),
        datasets:[{
            label:"体重(kg)",
            data: history.map(x => x.weight),
            borderWidth:3,
            tension:0.3
        }]
    },
    options:{
        responsive:true,
        maintainAspectRatio:false
    }
});
```

}

function updateAlice(power){

```
let message;

if(power < 300){
    message =
    "最近少し運動不足かもしれません💦 一緒に頑張りましょう！";
}
else if(power < 800){
    message =
    "順調です✨ この調子で健康レベルを上げましょう！";
}
else{
    message =
    "素晴らしいです！レベルアップ目前ですよ⚔️";
}

document.getElementById("aliceMessage")
    .innerText = message;
```

}

function calculateStreak(history){

```
if(history.length === 0){
    return 0;
}

return history.length;
```

}

function saveData(){

```
const weight =
    Number(
        document.getElementById("weight").value
    );

const training =
    Number(
        document.getElementById("training").value
    );

const cardio =
    Number(
        document.getElementById("cardio").value
    );

if(!weight){
    alert("体重を入力してください");
    return;
}

const power =
    Math.floor(
        training * 10 +
        cardio * 5 +
        (100 - weight)
    );

const level =
    Math.max(
        1,
        Math.floor(power / 100) + 1
    );

document.getElementById("power")
    .innerText = power;

document.getElementById("level")
    .innerText = level;

document.getElementById("titleName")
    .innerText = getTitle(level);

const stats =
    calculateStats(
        weight,
        training,
        cardio
    );

document.getElementById("str")
    .innerText = stats.str;

document.getElementById("vit")
    .innerText = stats.vit;

document.getElementById("agi")
    .innerText = stats.agi;

document.getElementById("int")
    .innerText = stats.int;

updateAlice(power);

const history =
    JSON.parse(
        localStorage.getItem("weightHistory")
    ) || [];

const today =
    new Date()
    .toLocaleDateString("ja-JP");

history.push({
    date: today,
    weight: weight
});

localStorage.setItem(
    "weightHistory",
    JSON.stringify(history)
);

createChart(history);

const streak =
    calculateStreak(history);

document.getElementById("streak")
    .innerText = streak;

localStorage.setItem(
    "healthQuestData",
    JSON.stringify({
        weight,
        training,
        cardio,
        power,
        level,
        stats
    })
);

alert("記録を保存しました！");
```

}

window.onload = function(){

```
const data =
    JSON.parse(
        localStorage.getItem(
            "healthQuestData"
        )
    );

const history =
    JSON.parse(
        localStorage.getItem(
            "weightHistory"
        )
    ) || [];

if(data){

    document.getElementById("weight")
        .value = data.weight;

    document.getElementById("training")
        .value = data.training;

    document.getElementById("cardio")
        .value = data.cardio;

    document.getElementById("power")
        .innerText = data.power;

    document.getElementById("level")
        .innerText = data.level;

    document.getElementById("titleName")
        .innerText = getTitle(data.level);

    document.getElementById("str")
        .innerText = data.stats.str;

    document.getElementById("vit")
        .innerText = data.stats.vit;

    document.getElementById("agi")
        .innerText = data.stats.agi;

    document.getElementById("int")
        .innerText = data.stats.int;
}

document.getElementById("streak")
    .innerText =
    calculateStreak(history);

createChart(history);

document.getElementById("aliceMessage")
    .innerText =
    aliceMessages[
        Math.floor(
            Math.random() *
            aliceMessages.length
        )
    ];
```

};
