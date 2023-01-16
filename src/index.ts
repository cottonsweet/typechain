import crypto from "crypto";

// 제네릭, public, private, protected, static

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

// implements 타입검사
// extends 상속
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

  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();
blockchain.addBlock("첫번째");
blockchain.addBlock("두번째");
blockchain.addBlock("세번째");
blockchain.addBlock("네번");
console.log(blockchain.getBlocks());

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 제네릭, public, private, protected, static

// NOTE : "매우" 기초적인 예시
const A: <T>(a: T) => T = (a) => a;

A<string>("3"); // "3"
A<boolean>(true); // true
A<number>(100); // 100

// 에러 케이스
A<boolean>("100");

// NOTE : 조금 고급진 예시
// 참조 : https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD-generics-%EC%9D%98-%EC%82%AC%EC%A0%84%EC%A0%81-%EC%A0%95%EC%9D%98
const Closure = function <T>(defaultvalue: T): [
  // NOTE : GETTER
  () => T,
  // NOTE : SETTER
  (newValue: T) => T,
] {
  let value: T = defaultvalue;
  const getter = () => value;
  const setter = (newValue: T) => (value = newValue);

  return [getter, setter];
};

type Type = "index" | "value" | "cotton-candy";
type N = 100 | 110 | 120;
type G = 100;

const a: number = 0;
const v = a; // 리터럴 넘버

type V = typeof v;

// 1. typeof는 "JS에서는" 타입을 알리는 문법.
// 2. TS에서는? 타입을 알려주는 문법

// NOTE : 타입 체크 시
// typeof와 instanceof를 모두 알아두시오.

const [value, setValue] = Closure("100"); // 타입 추론 (제네릭 -> 타입 지정)

// instanceof 이해도 문제 (난이도: 중)
interface Google {
  a: string;
  b: string;
  c: number;
}
// instanceof 클래스, 오브젝트 유형을 비교하는 키워드
if (value instanceof Google) {
  console.log("A");
} else {
  console.log("B");
}

// 정답 : "위의 문법은 옳은가?" => "옳지 않다"
// => interface니까.

const q = new Array(100).fill(0); // [0, 0, 0, ..., 0, 0]
// instanceof 이해도 문제 (난이도: 하)
console.log(q instanceof Array); // => false => "true"

// NOTE : [instanceof 이해하기]
// 1. instance의 뜻? => "객체"
// 2. (A instance of B => boolean) => "A가 B의 객체에 속하냐?" -> O/X
//    A -> 객체, B -> 생성자
//    => "A 객체가 B 생성자로 발생한 값인가?"

// Array -> 객체의 한 종류 (표준 API)
// Function, Object, Number, String, BigInt, ReadStream, ...

(() => {}) instanceof Function; // true

const a = 100; // number - primitive value - 객체 아님.
const b = Number(100); // Number - 객체
const c = new Number("100"); // Number(100) - 객체 (생성자 함수는 거의 객체)

typeof a === "object"; // Array, Object, Blob, File, Uint8Array, ArrayBuffer, ...
