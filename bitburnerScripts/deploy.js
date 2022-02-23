/** @param {NS} ns **/
export async function main(ns) {
	let scriptName = ns.args[0];
	let serverList = ns.args[1].split(",");
	let scriptArgs = ns.args[2];
	
	for(let server of serverList){
		let memory = ns.getServerMaxRam(server);
		let scriptMem = ns.getScriptRam(scriptName,server);
		await ns.scp(scriptName,server);
		await ns.exec(scriptName,server,Math.trunc(memory/scriptMem),scriptArgs);
	}
}