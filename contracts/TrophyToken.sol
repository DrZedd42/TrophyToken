pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';

contract TrophyToken is ERC721Full {
    mapping(uint256 => string) private titles;
    mapping(uint256 => uint256) private trophies;

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

    function getTokenData(uint256 tokenId)
        external
        view
        returns (string memory, uint256)
    {
        require(_exists(tokenId));

        return (titles[tokenId], trophies[tokenId]);
    }

    function getNextTokenId() internal view returns (uint256) {
        return totalSupply();
    }
}
