/* export default [
    {
        pid: 1,
        name: "Bernd Leno",
        team: "Arsenal FC",
        age: 30,
        height: 190,
        position: "GK",
        nation: "Germany"
    },
    {
        pid: 2,
        name: "Cristiano Ronaldo",
        team: "Manchester United",
        age: 37,
        height: 180,
        position: "FW",
        nation: "Portugal"
    },
    {
        pid: 3,
        name: "Mo Salah",
        team: "Liverpool FC",
        age: 30,
        height: 172,
        position: "FW",
        nation: "Egypt"
    },
    {
        pid: 4,
        name: "Sadio mane",
        team: "Liverpool FC",
        age: 30,
        height: 172,
        position: "FW",
        nation: "Egypt"
    },
    {
        pid: 5,
        name: "Diogo Jota",
        team: "Liverpool FC",
        age: 25,
        height: 172,
        position: "FW",
        nation: "Portugal"
    },
    {
        pid: 6,
        name: "Ruben Dias",
        team: "Manchester City",
        age: 24,
        height: 190,
        position: "DF",
        nation: "Portugal"
    },
    {
        pid: 7,
        name: "Joao Cancelo",
        team: "Manchester City",
        age: 26,
        height: 175,
        position: "DF",
        nation: "Portugal"
    },
    {
        pid: 8,
        name: "Ruben Neves",
        team: "Wolves",
        age: 24,
        height: 179,
        position: "MF",
        nation: "Portugal"
    },

] */
import rawData from './test.txt';

let data;

fetch(rawData)
  .then(r => r.text())
  .then(text => {
    console.log(text);
    data = JSON.parse(text);
    console.log(data);
  });

export default data;