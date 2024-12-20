/* 
This Christmas, you’ve been tasked with running an anagram quiz at 
the family gathering.

You have been given a list of anagrams, but you suspect that some 
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would 
be considered a valid anagram of "Bethlehem".
*/ 

let anagrams = [
    ["Can Assault", "Santa Claus"], //true
    ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"], //true
    ["Frosty The Snowman", "Honesty Warms Front"], //false
    ["Drastic Charms", "Christmas Cards"], //false
    ["Congress Liar", "Carol Singers"], //true
    ["The Tin Glints", "Silent Night"], //false
    ["Be The Helm", "Betlehem"], //false
    ["Is Car Thieves", "Christmas Eve"] //false
];

function findAnagrams(array){
    // write your code here
    
    const result = [];
    
    for(let pair of array){
        
        const [string1, string2] = pair.map((str)=> str.replace(/\s+/g, '').toLowerCase());
       
        if(string1.length !== string2.length) continue;
        
        // used frequency counter pattern
        const lookup = {};
    
        for(let letter of string1) {
            lookup[letter] = (lookup[letter] || 0) + 1
        }
    
        for(let letter of string2) {
            if(!lookup[letter]) {
                break;
            } 
            lookup[letter] -= 1;
        }
        
        if(Object.values(lookup).every((count)=> count === 0)){
            result.push(pair)
        }
    }
    
    return result;
    
}


//  console.log(findAnagrams(anagrams))