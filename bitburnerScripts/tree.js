/** @param {NS} ns **/
export async function main(ns) {
	let serverList = ["home"]; //Start at "home" server

	for(let server of serverList){ //For every server in serverList

		//Scan current server and store result
		let scanResult = ns.scan(server);

		//Look through each result
		for(let result of scanResult){

			//If the list DOES NOT contain result
			if(!serverList.includes(result)){
				
				//Add result to serverList
				serverList.push(result);
			}
		}
	}
	//Print list
	ns.tprint(serverList);
	
	//store in file ("w" overwrites old data)
	await ns.write("allServerNames.txt",serverList,"w");	
}