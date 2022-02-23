/** @param {NS} ns **/
export async function main(ns) {
	let targetServer = ns.args[0];
	let monThresh = 0.95;
	let secThreshold = 1;
	let minSec = ns.getServerMinSecurityLevel(targetServer);
	let maxMoney = ns.getServerMaxMoney(targetServer);

	while(true){
		let currentMoney = ns.getServerMoneyAvailable(targetServer);
		let security = ns.getServerSecurityLevel(targetServer);
		if(security > (minSec + secThreshold)){
			await ns.weaken(targetServer);
		}
		else if(currentMoney < (maxMoney * monThresh)){
			await ns.grow(targetServer);
		}
		else{
			await ns.hack(targetServer);
		}
	}
}