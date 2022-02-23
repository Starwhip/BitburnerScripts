/** @param {NS} ns **/
export async function main(ns) {
	let targetServer = ns.args[0];
	ns.nuke(targetServer);
}