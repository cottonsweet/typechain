import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}
class Block implements BlockShape {
  public hash: string;
  // 블록생성 하고 데이터를 받음
  constructor(public prevHash: string, public height: number, public data: string) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    // 그 데이터의 해쉬값은 해당 코드에서 생성하게 됨
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }
  public getBlokcs() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();
blockchain.addBlock("First");
blockchain.addBlock("second");
blockchain.addBlock("third");
blockchain.addBlock("four");
console.log(blockchain.getBlokcs());
