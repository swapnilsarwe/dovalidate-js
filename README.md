Project Name : dovalidate-js

Project Leader : Well there is no project leader as such, its just an attempt to learn javascript in a better way and contribute to the others. 

Description : This is the basic javascript validator under SWAPJS namespace. Its at its very early stage. It is not attempted to be the best validator. But the efforts will be made to make it usable in its best form to most of the people. Right now it only works on textfields and textareas and validates the empty, numeric, email, url type of data. 

Syntax : 
   Initially you need to initiate the validator. 
   For Eg: 
   var dovalidate = new SWAPJS.doValidate(); 
   Secondly you need to pass on the parameters. The parameters foremost consists of the id of the HTML form which you want to validate. Second the set of ids of the elements which you want to validate with the type of validation you want ao have on it. 
   For Eg:
   dovalidate.init('form_id', { // form_id is the id of the form 
   name: ['empty'], // 1. name is the id of an element. empty is the type of validation 
   email: ['empty', 'email'], // 2. email is the id of an element. empty and email are the type of validation 
   webpage: ['url'] // 3. webpage is the id of an element. url is the type of validation });
   
   1. empty is in other words required field, if that field is empty form would not submit 
   2. if there is a combination of validation type. then both the validation will be checked before letting form to submit. 
   3. no empty specified means, no need for that field to be filled, but if it has some content it has to be of the type mentioned or else it wont submit. 
   Last. If we dont want any particular element to get validated, just dont mention that element's id. 
   

Contact Me : swapnilsarwe[at]gmail[dot]com 
 
URL : http://swapnilsarwe.com/ 

Examples : Run the dovalidate.0.1.html and check the source code to see the working. 

Limitations : It works good with the form structure I have been using for quiet some time (which is shown in the example). I am working on it to be applicable to any kind of form structure. If not then atleast make it configurable to adjust to any form structure.