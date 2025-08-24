import crypto from 'crypto'

export class Block
{
    constructor(index,data,prevHash='',nonce=0)
    {
        this.index=index;
        this.data=data;
        this.prevHash=prevHash;
        this.nonce=nonce;
        this.currentHash=this.calculateHash();
    }

    calculateHash()
    {
        const hash = crypto.createHash('sha256');
        hash.update(`${this.nonce}${this.index}${this.data}${this.prevHash}`);
        return hash.digest('hex');
    }

    isPrime(num)
    {
        
        if(num<=1)
        {
            return false;
        }
        for(let i=2;i<=Math.sqrt(num);i++)
        {
            if(num%i==0)
            {
                return false;
            }
        }

        return true;
    }

    mineBlock(target)
    {
        const modTarget= target;
        while(true)
        {
            const tempHash=this.calculateHash();
            const modValue = parseInt(tempHash.slice(-4), 16)%modTarget;
            if(this.isPrime(modValue))
            {
                break;
            }
            this.nonce++;
            this.currentHash = this.calculateHash();
        }
        console.log(`Mined! Nonce: ${this.nonce}`);
    }
}
