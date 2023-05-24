// 필요한 모듈을 가져옵니다.
import { create } from 'ipfs-http-client';

// IPFS 노드를 생성합니다.
const ipfs = create('http://localhost:5001');

export const addFile = async ({ path, content }) => {
    const file = { path: path, content: Buffer.from(content) };
    const fileAdded = await ipfs.add(file);
    return fileAdded.cid.toString();
};

export const getFile = async (cid) => {
    const fileBuffer = [];
    for await (const chunk of ipfs.cat(cid)) {
        fileBuffer.push(chunk);
    }
    return Buffer.concat(fileBuffer);
};

const addHelloWorldFile = async () => {
    const fileAdded = await addFile({
        path: 'hello.txt',
        content: 'Hello World 101',
    });
    console.log('Added file:', fileAdded.path, fileAdded.cid);
};

// 스크립트가 실행될 때, addHelloWorldFile 함수를 호출합니다.
addHelloWorldFile().catch(console.error);
