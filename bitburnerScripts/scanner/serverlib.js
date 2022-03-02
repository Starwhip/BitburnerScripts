const servernames = "/scanner/servernames.txt";
const serverdetails = "/scanner/serverdetails.txt";
/** @param {NS} ns **/
export async function refreshServerList(ns) {
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
	
	//store in file ("w" overwrites old data)
	await ns.write(servernames,serverList,"w");	
}

/** @param {NS} ns **/
export async function analyzeServerList(ns){
	const serverList = ns.read(servernames).split(",");
	const serverDetailsList = [];

	for(let server of serverList){
		let serverObj = ns.getServer(server);
		
		let dataStruct = {'hostname':serverObj.hostname,
						'isAdmin':serverObj.hasAdminRights,
						'requiredPorts':serverObj.numOpenPortsRequired,
						'openPorts':serverObj.openPortCount,
						'requiredLevel':serverObj.requiredHackingSkill,
						'minSecurity':serverObj.minDifficulty,
						'maxMoney':serverObj.moneyMax,
						'maxRam':serverObj.maxRam};
		serverDetailsList.push(dataStruct);
	}

	let toWrite = ""
	for(let i = 0; i < serverDetailsList.length; i++){
		
		for(let property in serverDetailsList[i]){
			toWrite += property + ":" + serverDetailsList[i][property] + ";";
		}
		//If not last index
		if (i != serverDetailsList.length - 1){
			toWrite += "\n";
		}
	}
	await ns.write(serverdetails,toWrite,"w");
	return serverDetailsList;
}

export async function main(ns)
{
	await refreshServerList(ns);
	let details = await analyzeServerList(ns);
	ns.tprint(details);
}