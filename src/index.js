if (!navigator.userAgent.includes('Chrome')) {
    window.alert("App only supports Chromium-based browsers. App has been terminated.");
    window.stop();
}

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as L from 'lucid-cardano';
import * as Dotenv from 'dotenv';
import * as Utils from './utils';

/* DEBUG */ console.log(window);

Dotenv.config({ path: process.cwd() + "./.env" });

const vestingScript = {
    type: "PlutusV2",
    script: "590b30590b2d0100003232323322323233223232323232323233223233223232323232323232333222323232322323222323253353232323253355335323235002222222222222533533355301a12001321233001225335002210031001002502c25335333573466e3c0380040ec0e84d40b8004540b4010840ec40e4d401488009400440b04cd5ce2491f62656e65666963696172792773207369676e6174757265206d697373696e670002b15335323232350022235002223500522350022253335333501900b00600215335001153350051333501800b00300710361333501800b00300710361333501800b00300735500322222222222200533501433501635029350052200102d335015502802d123333333300122333573466e1c0080040bc0b8894cd4ccd5cd19b8700200102f02e101515335333573466e240080040bc0b8404c405088ccd5cd19b8800200102f02e22333573466e240080040bc0b888ccd5cd19b8900200102e02f22333573466e200080040b80bc894cd4ccd5cd19b8900200102f02e10011002225335333573466e240080040bc0b84008400440b04cd5ce248114646561646c696e65206e6f7420726561636865640002b102b135001220023333573466e1cd55cea80224000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd408c090d5d0a80619a8118121aba1500b33502302535742a014666aa04eeb94098d5d0a804999aa813bae502635742a01066a0460606ae85401cccd5409c0c5d69aba150063232323333573466e1cd55cea80124000466a0486464646666ae68cdc39aab9d5002480008cd40a8cd40edd69aba15002303e357426ae8940088c98c8100cd5ce02182101f09aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa0049000119a81499a81dbad35742a004607c6ae84d5d1280111931902019ab9c04304203e135573ca00226ea8004d5d09aba2500223263203c33573807e07c07426aae7940044dd50009aba1500533502375c6ae854010ccd5409c0b48004d5d0a801999aa813bae200135742a004605e6ae84d5d1280111931901c19ab9c03b03a036135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a008603e6ae84d5d1280211931901519ab9c02d02c0283333573466e1cd55ce9baa0054800080ac8c98c80a4cd5ce0160158139999ab9a3370e6aae7540192000233221233001003002375c6ae854018dd69aba135744a00c464c6405066ae700ac0a809840a44c98c809ccd5ce2490350543500029135573ca00226ea80044d55cf280089baa00132001355023221122253350011350032200122133350052200230040023335530071200100500400112223500222350032253335333500800700400215335003100110261025102612223232323253335006215333500621533350082130044984c00d261533350072130044984c00d26100d100b1533350072130044984c00d261533350062130044984c00d26100c1533350052100a100b100915333500521533350072130054984c011261533350062130054984c01126100c100a1533350062130054984c011261533350052130054984c01126100b2533350052153335007215333500721333500b00a002001161616100b153335006215333500621333500a009002001161616100a10092533350042153335006215333500621333500a009002001161616100a1533350052153335005213335009008002001161616100910082533350032153335005215333500521333500900800200116161610091533350042153335004213335008007002001161616100810072533350022153335004215333500421333500800700200116161610081533350032153335003213335007006002001161616100710061235001222222220071222003122200212220011221233001003002122123300100300212212330010030021232230023758002640026aa034446666aae7c004940288cd4024c010d5d080118019aba200201a232323333573466e1cd55cea80124000466442466002006004601c6ae854008c014d5d09aba2500223263201833573803603402c26aae7940044dd50009191919191999ab9a3370e6aae75401120002333322221233330010050040030023232323333573466e1cd55cea80124000466442466002006004602e6ae854008cd403c058d5d09aba2500223263201d33573804003e03626aae7940044dd50009aba150043335500875ca00e6ae85400cc8c8c8cccd5cd19b875001480108c84888c008010d5d09aab9e500323333573466e1d4009200223212223001004375c6ae84d55cf280211999ab9a3370ea00690001091100191931900f99ab9c02202101d01c01b135573aa00226ea8004d5d0a80119a805bae357426ae8940088c98c8064cd5ce00e00d80b89aba25001135744a00226aae7940044dd5000899aa800bae75a224464460046eac004c8004d5405c88c8cccd55cf80112804119a8039991091980080180118031aab9d5002300535573ca00460086ae8800c0604d5d080088910010910911980080200189119191999ab9a3370ea002900011a80398029aba135573ca00646666ae68cdc3a801240044a00e464c6402866ae7005c0580480444d55cea80089baa0011212230020031122001232323333573466e1d400520062321222230040053007357426aae79400c8cccd5cd19b875002480108c848888c008014c024d5d09aab9e500423333573466e1d400d20022321222230010053007357426aae7940148cccd5cd19b875004480008c848888c00c014dd71aba135573ca00c464c6402466ae7005405004003c0380344d55cea80089baa001232323333573466e1cd55cea80124000466442466002006004600a6ae854008dd69aba135744a004464c6401c66ae700440400304d55cf280089baa0012323333573466e1cd55cea800a400046eb8d5d09aab9e500223263200c33573801e01c01426ea80048c8c8c8c8c8cccd5cd19b8750014803084888888800c8cccd5cd19b875002480288488888880108cccd5cd19b875003480208cc8848888888cc004024020dd71aba15005375a6ae84d5d1280291999ab9a3370ea00890031199109111111198010048041bae35742a00e6eb8d5d09aba2500723333573466e1d40152004233221222222233006009008300c35742a0126eb8d5d09aba2500923333573466e1d40192002232122222223007008300d357426aae79402c8cccd5cd19b875007480008c848888888c014020c038d5d09aab9e500c23263201533573803002e02602402202001e01c01a26aae7540104d55cf280189aab9e5002135573ca00226ea80048c8c8c8c8cccd5cd19b875001480088ccc888488ccc00401401000cdd69aba15004375a6ae85400cdd69aba135744a00646666ae68cdc3a80124000464244600400660106ae84d55cf280311931900719ab9c01101000c00b135573aa00626ae8940044d55cf280089baa001232323333573466e1d400520022321223001003375c6ae84d55cf280191999ab9a3370ea004900011909118010019bae357426aae7940108c98c802ccd5ce00700680480409aab9d50011375400224464646666ae68cdc3a800a40084a00c46666ae68cdc3a8012400446a010600c6ae84d55cf280211999ab9a3370ea00690001091100111931900619ab9c00f00e00a009008135573aa00226ea8004484888c00c010448880048c8cccd5cd19b8750014800880188cccd5cd19b8750024800080188c98c8018cd5ce00480400200189aab9d37540029309100109100089000a490350543100112323001001223300330020020011",
};

const blockfrost = {
    url: "https://cardano-preview.blockfrost.io/api/v0",
    id: process.env.BLOCKFROST_PROJECT_ID
}

const VestingDatum = L.Data.Object({
    stakeholder: L.Data.Bytes(),
    deadline: L.Data.Integer(),
});

/**
 * NOTE: Connects the Nami wallet.
 */
async function connectNami() {
    const nami = window.cardano.nami;
    /* DEBUG */ console.log("show nami API object", nami)
    if (nami === undefined) {
        alert("The Nami wallet is not found. Consider installing the Chrome extension.");
        setTimeout(connectNami);
        //throw new Error ("No Nami wallet found.");
    } else {
        const namiApi = await nami.enable();
        return await L.Lucid.new(
            new L.Blockfrost(blockfrost.url, blockfrost.id),
            "Preview"
        ).then(a => a.selectWallet(namiApi));
    }
}

/**
 * Loads the panel that contains wallet .
 */
async function loadWalletDetails(wallet) {
    const { pkh: pkh, balance: balance } =
        await Utils.queryWalletDetails(wallet);

    const nodePKH = window.document.getElementById('cardanoPKH');
    Utils.removeChildren(nodePKH);
    nodePKH.appendChild(window.document.createTextNode(pkh));

    const nodeBalance = window.document.getElementById('cardanoBalance');
    const ada = Number(balance) / 1_000_000;
    Utils.removeChildren(nodeBalance);
    nodeBalance.appendChild(window.document.createTextNode(ada));
}

/**
 * Loads the panel that contains vesting Tx at the contract's address.
 */
async function loadVestingUTxOsTable(contractAddr, Datum) {
    const vestingUTxOs = await Utils.getVestingUTxOs(contractAddr, Datum);

    const vestingUTxOsTable = window.document.getElementById('vestingUTxOsTable');
    Utils.removeChildren(vestingUTxOsTable);

    // generates the UTxOs table for the Tx at that contract address.
    for (const x of vestingUTxOs) {
        const tr = window.document.createElement('tr');
        vestingUTxOsTable.appendChild(tr);

        Utils.addCell(tr, x.utxo.txHash + '#' + x.utxo.outputIndex, true);
        Utils.addCell(tr, x.datum.stakeholder, true);
        Utils.addCell(tr, x.utxo.assets.lovelace);
        Utils.addCell(tr, new Date(Number(x.datum.deadline)));
    }
}

/**
 * NOTE: VESTING
 */
async function onVest() {
    const nodeStakeholder = window.document.getElementById('vestStakeholderText');
    const stakeholder = nodeStakeholder.value;
    // console.log(stakeholder);
    const nodeAmount = window.document.getElementById('vestAmountText');
    const amount = BigInt(parseInt(nodeAmount.value));
    // console.log(amount);
    const nodeDeadline = window.document.getElementById('vestDeadlineText');
    const deadline = BigInt(Date.parse(nodeDeadline.value));
    // console.log(deadline);

    const plutusDatum = {
        stakeholder: stakeholder,
        deadline: deadline
    }

    const cborDatum = L.Data.to(plutusDatum, VestingDatum);
    const tx =
        await lucid
            .newTx()
            .payToContract(
                vestingAddress,
                { inline: cborDatum },
                { lovelace: amount })
            .complete();

    Utils.signAndSubmitCardanoTx(tx);

    beneficiaryNode.value = "";
    nodeAmount.value = "";
    nodeDeadline.value = "";
}

/**
 * NOTE: CLAIMING
 */
async function onClaim() {
    const cardanoPKH = await Utils.getCardanoPKH(wallet);

    const nodeRef = window.document.getElementById('claimReferenceText');
    const refTx = nodeRef.value;

    const utxo = await Utils.findUTxO(refTx, vestingAddress, VestingDatum);
    if (utxo) {
        const tx =
            await lucid
                .newTx()
                .collectFrom(
                    [utxo.utxo],
                    L.Data.to(new L.Constr(0, [])))
                .attachSpendingValidator(vestingScript)
                .addSignerKey(cardanoPKH)
                .validFrom(Number(utxo.datum.deadline))
                .complete();

        Utils.signAndSubmitCardanoTx(tx);
    } else {
        console.log("UTxO not found");
    }

    nodeRef.value = "";
}

/**
 * NOTE: App Run.
 */
window.lucid = await connectNami();
// console.log("show window.lucid object with Nami wallet enabled");
// console.log(window.lucid);

const wallet = lucid.wallet;
const vestingAddress = window.lucid.utils.validatorToAddress(vestingScript);

await loadWalletDetails(wallet);
await loadVestingUTxOsTable(vestingAddress, VestingDatum);

/**
 * NOTE: Additional event listeners.
 */
window.document
    .getElementById("vestButton")
    .addEventListener("click", onVest);
window.document
    .getElementById("claimButton")
    .addEventListener("click", onClaim);
window.document
    .getElementById("vestDeadlineText")
    .addEventListener("change",
        () => window.document.getElementById('vestDeadlineText').style.color = "black");
//window.document.getElementById('cardanoPKHButton').addEventListener("click", () => onCopy("cardanoPKH"));
