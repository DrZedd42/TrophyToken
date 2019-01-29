pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';

contract TrophyToken is ERC721Full {
    mapping(uint256 => string) titles;
    mapping(uint256 => uint256) trophies;

    constructor () ERC721Full('TrophyToken', 'TROPH') public { }

    function mint(
        address to,
        string calldata title,
        uint256 trophy,
        string calldata uri
    )
        external
    {
        uint256 tokenId = getNextTokenId();

        _mint(to, tokenId);

        titles[tokenId] = title;
        trophies[tokenId] = trophy;

        _setTokenURI(tokenId, uri);
    }

    function getNextTokenId() internal view returns (uint256) {
        return totalSupply().add(1);
    }
}
