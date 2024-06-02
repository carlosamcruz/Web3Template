import React, { useRef, FC, useState} from 'react';

import './App.css';

import { DefaultProvider, MethodCallOptions, sha256, toHex, PubKey, bsv, TestWallet, Tx, toByteString, PandaSigner } from "scrypt-ts";
import { Statefulsc } from "./contracts/stateful";

import {homepvtKey, homenetwork, compState, browserWallet} from './Page02Access';
import { broadcast, listUnspent, getTransaction, getSpentOutput} from './mProviders';
import { hexToLittleEndian, sleep } from "./myUtils";

//const provider = new DefaultProvider({network: bsv.Networks.testnet});
const provider = new DefaultProvider({network: homenetwork});
let Alice: TestWallet
let signerPanda: PandaSigner

let txlink2 = ""

function PageSC05CounterDec() {

  const [deployedtxid, setdeptxid] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const txid = useRef<any>(null);
  const txidPrvStt = useRef<any>(null);

  const interact = async (amount: any) => {
    setdeptxid("Wait!!!")

    //Para evitar o problema:  Should connect to a livenet provider
    //Bypassar o provider externo e const
    let provider = new DefaultProvider({network: homenetwork});

    if(txid.current.value.length === 64 || txidPrvStt.current.value.length === 64)
    {
      if(!browserWallet)
      {
        let privateKey = bsv.PrivateKey.fromHex(homepvtKey, homenetwork)
        Alice = new TestWallet(privateKey, provider)
      }
      else
      {
        signerPanda = new PandaSigner(provider)
      }

      try {
  
        let signer
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
        let tx = new bsv.Transaction
        //////////////////////////////////////////////////////
        //Jesus is the Lord
        //////////////////////////////////////////////////////
          
        if(txid.current.value.length === 64)
        {
            tx = await provider.getTransaction(txid.current.value)
        }
        else if(txidPrvStt.current.value.length === 64)
        {
            let currentStateTXID = txidPrvStt.current.value
            let stxos = await getSpentOutput(currentStateTXID, 0, homenetwork)
      
            while(stxos[0].inputIndex !== -1)
            {
              currentStateTXID = stxos[0].txId;
      
              await sleep(500);
      
              stxos = await getSpentOutput(currentStateTXID, 0, homenetwork)
              //console.log("TX Output ", i, " spent on:", stxos[0].txId)
              console.log("Input:", stxos[0].inputIndex)
            }
            tx = await provider.getTransaction(currentStateTXID)
        }
    
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
    
        console.log('Current State TXID: ', tx.id)
  
        //const instance = Helloworld02.fromTx(tx, 0)
        const counter = Statefulsc.fromTx(tx, 0)
        
        await counter.connect(signer)
  
        let currentInstance = counter 
  
        const balance = currentInstance.balance

        //console.log('Balance: ', balance)

        const nextInstance = currentInstance.next() 
    
        // apply updates on the next instance off chain 
        nextInstance.decrement() 
  
        // call the method of current instance to apply the updates on chain 
        //const { tx: tx_i } = await currentInstance.methods.incrementOnChain({
        const { tx: callTx } = await currentInstance.methods.decrementOnChain({    
            next: { 
                instance: nextInstance, 
                balance, 
            }, 
        } as MethodCallOptions<Statefulsc>) 
  
        //console.log( 'Counter: ', currentInstance.count + 1n)
        console.log( 'Counter: ', nextInstance.count)
        console.log( 'TXID: ', callTx.id)
          
        if(homenetwork === bsv.Networks.mainnet )
        {
          txlink2 = "https://whatsonchain.com/tx/" + callTx.id;
        }
        else if (homenetwork === bsv.Networks.testnet )
        {
          txlink2 = "https://test.whatsonchain.com/tx/" + callTx.id;
        }
        setLinkUrl(txlink2);
        setdeptxid(callTx.id)
    
      } catch (e) {
        console.error('Decrement failes', e)
        alert('Decrement failes')
        setdeptxid("")
      }
    }
    else
    {
      alert('Wrong TXID Format!!!')
      setdeptxid("Try Again!!!")
    }

  };

  
  return (
    <div className="App">
        <header className="App-header">

        <h2 style={{ fontSize: '34px', paddingBottom: '5px', paddingTop: '5px'}}>

          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>   
          On Chain Counter - Decrement
          
        </h2>

        <div>

          <div style={{ textAlign: 'center' , paddingBottom: '20px' }}>
                
                <label style={{ fontSize: '14px', paddingBottom: '2px' }}
                  >Inform Current or Previous State TXID:  
                </label>     
          </div>

          <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <label style={{ fontSize: '14px', paddingBottom: '5px' }}  
                > 
                    <input ref={txid} type="hex" name="PVTKEY1" min="1" placeholder="current state" />
                </label>     
          </div>

          <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <label style={{ fontSize: '14px', paddingBottom: '5px' }}  
                > 
                    <input ref={txidPrvStt} type="hex" name="PVTKEY1" min="1" placeholder="pevious state (optional)" />
                </label>     
          </div>

          <div style={{ textAlign: 'center' }}>     
                <button className="insert" onClick={interact}
                    style={{ fontSize: '14px', paddingBottom: '2px', marginLeft: '0px'}}
                >Decrement</button>
          </div>
        </div>


        {
          deployedtxid.length === 64?
          
         /* <button onClick={handleCopyClick}>Copy to ClipBoard</button> */

          <div>
            <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '20px' }}>
              <p className="responsive-label" style={{ fontSize: '12px' }}>TXID: {deployedtxid} </p>
            </div>
            <div className="label-container" style={{ fontSize: '12px', paddingBottom: '20px', paddingTop: '0px' }}>
              <p className="responsive-label" style={{ fontSize: '12px' }}>TX link: {' '} 
                  <a href={linkUrl} target="_blank" style={{ fontSize: '12px', color: 'cyan'}}>
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

export default PageSC05CounterDec;
