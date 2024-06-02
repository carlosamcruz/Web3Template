import React, { useRef, FC, useState} from 'react';

import './App.css';

import { DefaultProvider, sha256, toHex, PubKey, bsv, TestWallet, Tx, toByteString, PandaSigner } from "scrypt-ts";
import { Helloworld02 } from "./contracts/helloworld02";
//import {homepvtKey} from './Home';

import {homepvtKey, homenetwork, compState, browserWallet} from './Page02Access';


//const provider = new DefaultProvider({network: bsv.Networks.testnet});
const provider = new DefaultProvider({network: homenetwork});
let Alice: TestWallet
let signerPanda: PandaSigner

function PageSC01HelloWorld() {
//const  deployACT: FC = () => {  


  const [deployedtxid, setdeptxid] = useState("");
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  let txlink2 = ""
  const msg = useRef<any>(null);
  const value = useRef<any>(null);

  const deploy = async (amount: any) => {

    //Para evitar o problema:  Should connect to a livenet provider
    //Bypassar o provider externo e const
    let provider = new DefaultProvider({network: homenetwork});

    //const your_signer = new YourSigner(new DefaultProvider());

    if((homepvtKey.length != 64 && browserWallet == false) || value.current.value < 2)
    {
      alert('No PVT Key or Wrong Data!!!')
      //console.log("BrowseWallet", browserWallet)
    }
    else
    {
      setdeptxid("Wait!!!")

      //let privateKey = bsv.PrivateKey.fromHex(homepvtKey, bsv.Networks.testnet)

      if(!browserWallet)
      {
        let privateKey = bsv.PrivateKey.fromHex(homepvtKey, homenetwork)
        Alice = new TestWallet(privateKey, provider)
      }
      else
      {
        signerPanda = new PandaSigner(provider)
      }

      //Linha necessária nesta versão
      //O signee deve ser connectado
      //await Alice.connect(provider)

      try {

        let signer
        //let signer = Alice
        //let signer = signerPanda

        //Linha necessária nesta versão
        //O signee deve ser connectado
        //await signer.connect(provider)

        if(!browserWallet)
        {
          signer = Alice
          await signer.connect(provider)
        }
        else
        {
          signer = signerPanda
          
          const { isAuthenticated, error } = await signer.requestAuth()
          if (!isAuthenticated) {
            alert(`Buyer's Yours wallet is not connected: ${error}`)
          }
        }


        //const message = toByteString('hello world', true)
        const message = toByteString(msg.current.value, true)
        const instance = new Helloworld02(sha256(message))
        //const instance = new Helloworld02(0n)
        
        await instance.connect(signer);
            
        //const deployTx = await instance.deploy(100)
        const deployTx = await instance.deploy(value.current.value)

        console.log('Helloworld contract deployed: ', deployTx.id)
        //alert('deployed: ' + deployTx.id)


        if(homenetwork === bsv.Networks.mainnet )
        {
          txlink2 = "https://whatsonchain.com/tx/" + deployTx.id;
        }
        else if (homenetwork === bsv.Networks.testnet )
        {
          txlink2 = "https://test.whatsonchain.com/tx/" + deployTx.id;
        }
        setLinkUrl(txlink2);
  
        setdeptxid(deployTx.id)

      } catch (e) {
        console.error('deploy HelloWorld failes', e)
        alert('deploy HelloWorld failes')
      }
    }
  };

  return (
    <div className="App">



        <header className="App-header">
          

        <h2 style={{ fontSize: '34px', paddingBottom: '5px', paddingTop: '5px'}}>

          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          On Chain Hello World - Create
        
        </h2>

        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>        
                  <label style={{ fontSize: '14px', paddingBottom: '0px' }}
                    >Inform a Message and Value then Press Deploy:  
                  </label>     
        </div>

        <div style={{ display: 'inline-block', textAlign: 'center', paddingBottom: '20px' }}>
            <label style={{ fontSize: '14px', paddingBottom: '0px' }}  
                > 
                    <input ref={value} type="number" name="PVTKEY1" min="1" placeholder="satoshis (min 2 sat)" />
                </label>     
        </div>

        <div style={{ display: 'inline-block', textAlign: 'center', paddingBottom: '20px' }}>
            <label style={{ fontSize: '14px', paddingBottom: '0px' }}  
                > 
                    <input ref={msg} type="text" name="PVTKEY1" min="1" placeholder="message" />
                </label>     
        </div>

        <button className="insert" onClick={deploy}
                style={{ fontSize: '14px', paddingBottom: '2px', marginLeft: '5px'}}
        >Deploy</button>
                              
        {
          deployedtxid.length === 64?
          
         /* <button onClick={handleCopyClick}>Copy to ClipBoard</button> */

          <div>
          <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '20px' }}>
            <p className="responsive-label" style={{ fontSize: '12px' }}>TXID: {deployedtxid} </p>
          </div>
          <div className="label-container" style={{ fontSize: '12px', paddingBottom: '20px', paddingTop: '0px' }}>
            <p className="responsive-label" style={{ fontSize: '12px' }}>TX link: {' '} 
                <a href={linkUrl} target="_blank" style={{ fontSize: '12px', color:'cyan'}}>
                {linkUrl}</a></p>
          </div>
        </div>
          
          
          :

          <div className="label-container" style={{ fontSize: '12px', paddingBottom: '20px', paddingTop: '20px' }}>
          <p className="responsive-label" style={{ fontSize: '12px' }}>{deployedtxid} </p>
        </div>
          
      }

      </header>
    </div>
  );
}

export default PageSC01HelloWorld;
