
//https://habtam.bet/unique-link/7OdkDL7g4jgVHz2d082a

let globalList = []

//defualt pattern range 
let patternRange = 4


function hiddenMode(){
	
	try{
	document.getElementsByClassName("app-bets-widget")[0].style.width = "130%"
	
	document.getElementsByClassName("stage-board")[0].style.opacity = '0.0'
	
	document.getElementsByClassName("result-history disabled-on-game-focused")[0].style.opacity = '0.2'
	document.getElementsByClassName("bet-controls")[0].style.opacity = '0'
	
	document.getElementsByClassName("header__rows")[0].style.opacity = '0.0'
	document.getElementsByClassName("main-header")[0].style.opacity = '0.0'
	}catch(e){}
	
}
hiddenMode()


function roundFractionNumber(n){

    let string_n = n.toString()
    let string_split_by_dote = string_n.split('.')
        string_split_by_dote = string_split_by_dote[1]
    //console.log(`string_split_by_dote ${string_split_by_dote}`)

     if(string_split_by_dote == undefined)
        return n 
    
    
    let fraction1 = string_split_by_dote.length > 0 ? string_split_by_dote : '0'
        
    return  parseFloat(parseInt(n) + '.' +fraction1 + '0')
}

function winnPattern(){
	let count = 0
	let pattern = []
	
	for(let x=0; x<globalList.length; x++){
		if(globalList[x] > 1.99){
			count += 1
		}else{
			if(count > 0){
				pattern.push(count)
			}
			count = 0
		}
	}
	
	return pattern
}

function faildPattern(){
	let count = 0
	let pattern = []
	
	for(let x=0; x<globalList.length; x++){
		if(globalList[x] < 2){
			count += 1
		}else{
			if(count > 0){
				pattern.push(count)
			}
			count = 0
		}
	}
	
	return pattern
}


//function to change patternRange
function incremmentPatternRange(s){
    if(s == 'i')
        patternRange++
    else if(s == 'd')
        if(patternRange > 1)
        patternRange--

    autoBetPatternFinder()

    return true
}


function changeResultTo12(){
	
	let pattern = []
	
	for(let x=0; x<globalList.length; x++){
		if(globalList[x] < 2){
			pattern.push(1)
		}else{
			pattern.push(2)
		}
	}
	
	return pattern
}

function autoBetPatternFinder(){
    console.log("[function]  : autoBetPatternFinder()")

    //console.clear()
	const betsList = document.querySelector(".bets-list");
	
    if (betsList) {
		 betsList.innerHTML = `<center style="font-size:18px;"> -- Code By <i>turnhex</i>  [${globalList.length}] --</center>`;
    }

	let winnp  = winnPattern()
	let faildp = faildPattern()
	
	
	
	//betsList.innerHTML += "<br>"
		
	last13resultWinn = winnp.slice(0, patternRange)
	last13resultFaild = faildp.slice(0, patternRange)
	
	stringHtmlPatterns = `<div>`
	let winPatternDisplayRange  = winnp.length > 15 ? 15 : winnp.length
	let failPatternDisplayRange = faildp.length > 15 ? 15 : faildp.length
	

	
	let stringHtmlWinPattern = 'Winn = '
	for(let x=0; x<(winPatternDisplayRange-patternRange); x+=patternRange){
		let group1colorWin = globalList[0] > 1.99 & x == 0 ? 'yellow' : 'gray'
		stringHtmlWinPattern += `<b style="color:${group1colorWin}">${winnp.slice(x, x+patternRange)} </b> - `
	}
	
	let stringHtmlFailPattern = '<br>Faild = '
	for(let x=0; x<(failPatternDisplayRange-patternRange); x+=patternRange){
		let group1colorFail = globalList[0] < 2 & x == 0 ? 'yellow' : 'gray'
		stringHtmlFailPattern += `<b style="color:${group1colorFail}">${faildp.slice(x, x+patternRange)} </b> - `
	}
	stringHtmlPatterns += stringHtmlWinPattern + stringHtmlFailPattern + `</div>`
	betsList.innerHTML += stringHtmlPatterns
	
	
    	
	//retrive old pattern result 
	let newGlobalList = []
	
	let globalCurrentWinndPattern = winnp.slice(0, patternRange).toString()
	let globalCurrentFaildPattern = faildp.slice(0, patternRange).toString()
	
	console.log(`globalCurrentWinndPattern : ${globalCurrentWinndPattern}`)
	console.log(`globalCurrentFaildPattern : ${globalCurrentFaildPattern}`)
	

    
	function customeWinPattern(){
		let count = 0
		let pattern = []
		
		for(let x=0; x<newGlobalList.length; x++){
			if(newGlobalList[x] > 1.99){
				count += 1
			}else{
				if(count > 0){
					pattern.push(count)
				}
				count = 0
			}
		}
		
		return pattern
	}

	function customeFaildPattern(){
		let count = 0
		let pattern = []
		
		
		
		for(let x=0; x<newGlobalList.length; x++){
			if(newGlobalList[x] < 2){
				count += 1
			}else{
				if(count > 0){
					pattern.push(count)
				}
				count = 0
			}
		}
		
		return pattern
	}

	let winnPatternResults  = []
	let faildPatternResults = []
	
	
	for(let x=globalList.length-1; x>=0; x--){
		
		if(newGlobalList.length < 1)
			newGlobalList.push(globalList[x])
		else{
			let tmpNewGlobalList = []
			tmpNewGlobalList.push(globalList[x])
			tmpNewGlobalList.push(...newGlobalList)
			newGlobalList= tmpNewGlobalList
		}
		
		
		currentWinnPattern = customeWinPattern()
		currentFaildPattern = customeFaildPattern()

        
		if(currentWinnPattern.length > patternRange-1 & newGlobalList[0] > 1.99){
			currentWinP = currentWinnPattern.slice(0, patternRange).toString()
		    
			if(currentWinP == globalCurrentWinndPattern){
				console.log(`Similare : currentWinP ${currentWinP} == ${globalCurrentWinndPattern} globalCurrentWinndPattern`)
                if(globalList[x-1])
				    winnPatternResults.push(globalList[x-1])
			}
		}
	

		if(currentFaildPattern.length > patternRange-1 & newGlobalList[0] < 2){
			currentFailP = currentFaildPattern.slice(0, patternRange).toString()
            
			if(currentFailP == globalCurrentFaildPattern){
				console.log(`Similare : currentFailP ${currentFailP} == ${globalCurrentFaildPattern} globalCurrentFaildPattern`)
                if(globalList[x-1])
				    faildPatternResults.push(globalList[x-1])
			}
		}
		
	}
	
    winnPatternResults = winnPatternResults.reverse()
	faildPatternResults = faildPatternResults.reverse()

    let priviusLastOdd = globalList[0] > 1.99 ? winnPatternResults.length == 0 ? globalList[0] : winnPatternResults[0]  : faildPatternResults.length == 0 ? globalList[0] : faildPatternResults[0]
    
    let priviusLastOddAfterHistory = []

    
    for(let x=1; x<globalList.length; x++){
        if(roundFractionNumber(priviusLastOdd) == roundFractionNumber(globalList[x]))
            priviusLastOddAfterHistory.push(roundFractionNumber(globalList[x-1]))
    }
    
    
    // game is on win 
    s_history = '<table>'

    if(globalList[0] > 1.99){
        s_history += `
                <tr>
                    <td style="color:yellow;  border:1px solid white; text-align: center; font-size:18px"><b style="color:green"> Status W : </b> ${winnp.slice(0, patternRange).toString()} </td>
                    <td style="color:yellow;  border:1px solid white; text-align: center; font-size:18px"><b style="color:green"> Last Odd : </b> ${roundFractionNumber(priviusLastOdd)}     </td>
                </tr>`
        
		let winnPatternResultsLength = winnPatternResults.length > 15 ? 15 : winnPatternResults.length
        for(let x=0; x<winnPatternResultsLength; x++){
            
            let colorW = winnPatternResults[x] < 2 ? 'red' :  'green'
            let colorWodd = priviusLastOddAfterHistory[x] < 2 ? 'red' : 'green'
            
            let undefinedStyleFr = winnPatternResults[x] == undefined ? 'opacity: 0' : 'opacity: 1'
            let undefinedStyleWo = priviusLastOddAfterHistory[x] == undefined ? 'opacity: 0' : 'opacity: 1'
                
            s_history += `
                <tr>
                    <td style="color:${colorW};     border:1px solid white; text-align: left; padding-left:8px;${undefinedStyleFr}"> WINN : ${winnPatternResults[x]} </td>
                    <td style="color:${colorWodd};  border:1px solid white; text-align: left; padding-left:8px;${undefinedStyleWo}"> ODD : ${priviusLastOddAfterHistory[x]} </td>
                </tr>
                `
        }

    }else{
        s_history += `
                <tr>
                    <td style="color:yellow; border:1px solid red; text-align: center; font-size:18px"><b style="color:red"> Status F: </b> ${faildp.slice(0, patternRange).toString()} </td>
                    <td style="color:yellow; border:1px solid white; text-align: center; font-size:18px"><b style="color:red"> Last Odd : </b> ${roundFractionNumber(priviusLastOdd)}     </td>
                </tr>`
        
		let faildPatternResultsLength = faildPatternResults.length > 15 ? 15 : faildPatternResults.length
        for(let x=0; x<faildPatternResults; x++){
            
            let colorW = faildPatternResults[x] < 2 ? 'red' : 'green'
            let colorWodd = priviusLastOddAfterHistory[x] < 2 ? 'red' : 'green'
            
           
            let undefinedStyleFr = faildPatternResults[x] == undefined ? 'opacity: 0' : 'opacity: 1'
            let undefinedStyleFo = priviusLastOddAfterHistory[x] == undefined ? 'opacity: 0' : 'opacity: 1'
                
                
            s_history += `
                <tr>
                    <td style="color:${colorW};     border:1px solid white; text-align: left; padding-left:8px;${undefinedStyleFr}"> FAILD : ${faildPatternResults[x]} </td>
                    <td style="color:${colorWodd};  border:1px solid white; text-align: left; padding-left:8px;${undefinedStyleFo}"> ODD : ${priviusLastOddAfterHistory[x]} </td>
                </tr>
                `
        }
    }
    s_history += '</table>'

    
    s_history += `
        <br>
        <div>
        <center>
            <button onclick="incremmentPatternRange('d')">-</button>  ${patternRange} <button onclick="incremmentPatternRange('i')">+</button> 
        </center>
        </div>

		
    `


	betsList.innerHTML  += s_history
		
	return true	
}

function lastProcess(){
	
	
	let payout = document.querySelector('.payouts-block').getElementsByClassName("payout")
	let result = []
	for(let x=0; x<payout.length; x++){
		result.push(parseFloat(payout[x].innerText.replace('x','')))
	}
	
	if(globalList.length < 1){
		globalList = result
	}else{
		//upped on global list
		
		let positionGlobalList = globalList.slice(0,4)
		let positionPointer = 0
		for(let x=0; x<result.length; x++){
			positionCurrentList = result.slice(x, x+4)
			if(positionCurrentList.toString() == positionGlobalList.toString()){
				positionPointer = x
				x = result.length; 
				break
			}
		}
		
		let newList = result.slice(0, positionPointer)
		//betsList.innerHTML += `New result : ${newList} `
		newList.push(...globalList)
		globalList = newList
		
	}
		
	
	autoBetPatternFinder()
}

// Select the target node
const targetNodeResult = document.querySelector('.payouts-block');

// Check if the element exists
if (targetNodeResult) {
  // Create a callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
    lastProcess()
  };

  // Create an observer instance linked to the callback function
  const observerResult = new MutationObserver(callback);

  // Set observer options
  const configResult = {
    attributes: false,      // Watch for attribute changes
    childList: true,       // Watch for additions or removals of child elements
    subtree: false,         // Watch the entire subtree
    characterData: false    // Watch for text content changes
  };

  // Start observing the target node
  observerResult.observe(targetNodeResult, configResult);

  console.log('Observer is now watching .payouts-block');
} else {
  console.error('Element with class "payouts-block" not found.');
}
