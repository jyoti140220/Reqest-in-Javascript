const axios = require('axios');
const express= require('express');
const fs = require('fs');
const readlinesync = require('readline-sync').question


var courses;
var num;
var slug_array=[]
var allCoursesName = axios.get("http://saral.navgurukul.org/api/courses")
    .then(response => {
        var dataObject = response.data
        // console.log(dataObject)
        var dataString = JSON.stringify(response.data, null, 6)
        // console.log(dataString)

        fs.writeFile("Availablecourse.json", dataString, (err => {
            if (err) {
                console.log(err)
            }

        }))
        courses = dataObject['availableCourses'], i = 0, ids_array = []
        while (i < courses.length) {
            var ids = courses[i]['id']
            console.log(i + 1, courses[i]['name'], ids)
            console.log()
            ids_array.push(ids)
            i++
        }


    })
function childExcersize() {
    num = parseInt(readlinesync("enter the number :"))
    console.log()
    console.log(courses[num - 1]['name'], "\n\n******************************************* PERENT EXCERSIZE *******************************************\n")
    axios.get("http://saral.navgurukul.org/api/courses/"+ids_array[num-1]+"/exercises")
    .then(response=>{
        var objectData=response.data
        var stringData=JSON.stringify(objectData,null,6)
        fs.writeFile("Exercise"+ids_array[num-1]+".json",stringData,(err=>{
            // console.log(err)
        }))
        var i=0,l=objectData['data']
        while (i<l.length){
            console.log(i+1,l[i]['name'])
            var a=l[i]['childExercises']
            // console.log(a.length)
            slug_array.push(l[i]['slug'])
            if (a.length==0){
                console.log("   ",l[i]['childExercises'])
            }else{
                var j=0
                while (j<a.length){
                    console.log("   ",j+1,l[i]['childExercises'][j]['name'])
                    slug_array.push(l[i]['childExercises'][j]['slug'])
                    j++;
                }
            }
            console.log()
            i++;
            
        }

    })

}
var slug=setTimeout(function a(){
    console.log("*************************************************** SLUG AAYA HAI ***************************************************")
    slugInput=parseInt(readlinesync("enter the slug index :"))
    console.log()
    axios.get("http://saral.navgurukul.org/api/courses/"+ids_array[num-1]+"/exercise/getBySlug?slug="+slug_array[slugInput])
    .then(response=>{
        console.log(response.data['content'],"\n")
    })

},5000)
async function coursesDetials(){
    let data= await allCoursesName;
    let data2=await slug
    let data1=await childExcersize()
    

}
coursesDetials()


setTimeout(function next(){
    console.log("******************************************* WHAT'S NEXT **********************************************")
    var user1=readlinesync("what you want, 1.next, 2.previus, 3.up, 4.stop :-")
    if (user1=="next"){
        if (slug_array[slugInput-1]==slug_array[-1]){
            console.log("there is no slug")
        }else{
            axios.get("http://saral.navgurukul.org/api/courses/"+ids_array[num-1]+"/exercise/getBySlug?slug="+slug_array[slugInput+1])
            .then(res=>{
                var datas=res.data
                console.log(datas['content'])
            })
        }
    }else if(user1=="previus"){
        if (slugInput==0){
            console.log("there is no slug")
        }else{
            axios.get("http://saral.navgurukul.org/api/courses/"+ids_array[num-1]+"/exercise/getBySlug?slug="+slug_array[slugInput-1])
            .then(res=>{
                var datas=res.data
                console.log(datas['content'])
            })
        }
    }else{
        console.log("\n**************************************** THANK YOU ***************************************\n")
    }
    
},9000)




