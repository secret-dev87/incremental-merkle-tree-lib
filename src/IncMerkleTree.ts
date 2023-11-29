import { AbiCoder, ethers, sha256 } from "ethers";

export class IncMerkleTree {
    treeDepth: number;
    leafCount: number = 0;
    // leaf index: 0, 1, 2
    rootHash2LeafIndex: Map<string, number>;
    // node index:
    //    1
    //   / \
    //  2   3
    nodeIndex2Hash: Map<number, string>;
    leafIndex2Data: Map<number, string>;
    zeroHashes: string[];

    constructor(treeDepth: number) {
        this.treeDepth = treeDepth;
        this.zeroHashes = new Array(treeDepth);
        this.rootHash2LeafIndex = new Map();
        this.nodeIndex2Hash = new Map();
        this.leafIndex2Data = new Map();
        this.zeroHashes[0] = ethers.ZeroHash;
        for (let height = 0; height < treeDepth - 1; height++) {
            const childHash = this.zeroHashes[height];
            this.zeroHashes[height + 1] = sha256(new AbiCoder().encode(["bytes32", "bytes32"], [childHash, childHash]));
            // console.info(`${height + 1} ${this.zeroHashes[height + 1]}`);
        }
    }

    private parent(nodeIndex: number) {
        return nodeIndex / 2;
    }

    private left(nodeIndex: number) {
        return nodeIndex * 2;
    }

    private right(nodeIndex: number) {
        return nodeIndex * 2 + 1;
    }

    private leafIndex2NodeIndex(leafIndex: number) {
        return 2 ** (this.treeDepth - 1) + leafIndex;
    }

    async insertLeaf(leafIndex: number, leafData: string, nodeHash: string) {
        // 1. check
        if (leafIndex != this.leafCount) {
            throw Error("leafIndex != this.leafCount");
        }
        // 2. update hash up to root

    }

    getLeafCount() {
        return this.leafCount;
    }

    getProof(targetLeafIndex: number, currentLeafIndex: number) {
        if (targetLeafIndex > currentLeafIndex) {
            throw Error("targetLeafIndex > currentLeafIndex");
        }
        if (currentLeafIndex >= this.leafCount) {
            throw Error("currentLeafIndex >= this.leafCount");
        }

        // 1. get the hash array up to root of target index


        // 2. get the hash array up to root of current leaf index


        // 3. merge the two hash array
    }
}