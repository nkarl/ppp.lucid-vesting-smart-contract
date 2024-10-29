import * as utils from './utils.js';

export async function queryWalletData(wallet) {
    const pkh = await getCardanoPKH(wallet);
    const utxos = await wallet.getUtxos();
    /* DEBUG */ console.log("show details of utxos from pkh");
    /* DEBUG */ console.log(utxos);
    const balance = utxos.reduce((acc, utxo) => acc + utxo.assets.lovelace, 0n);

    return {
        cardanoPKH: pkh,
        cardanoBalance: balance,
    };
}

export async function getCardanoPKH(wallet) {
    const addr = await wallet.address();
    const details = L.getAddressDetails(addr);
    /* DEBUG */ console.log("show address details");
    /* DEBUG */ console.log(details);
    return details.paymentCredential.hash;
}

export async function getVestingUTxOs(address, Datum) {
    const utxos = await lucid.utxosAt(address);
    /* DEBUG */ console.log("show detailed utxos from the contract addr");
    /* DEBUG */ console.log(utxos);
    let res = [];
    for (const utxo of utxos) {
        const datum = utxo.datum;
        if (datum) {
            try {
                const d = L.Data.from(datum, Datum);
                res.push({ utxo: utxo, datum: d });
            } catch (err) {
                console.log("error: unable to convert from CBOR object (could be a Map object)");
            }
        }
    }
    /* DEBUG */ console.log("show detailed _valid_ utxos from the contract addr");
    /* DEBUG */ console.log(res);
    return res;
}

