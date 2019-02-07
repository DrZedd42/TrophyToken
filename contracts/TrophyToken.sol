pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/payment/escrow/Escrow.sol';

contract TrophyToken is ERC721Full, Ownable {
    uint256 public tokenPrice;
    Escrow private escrow;
    mapping(uint256 => string) private titles;
    mapping(uint256 => uint256) private trophies;
    string private uriBase;

    constructor (uint256 _tokenPrice, string memory _uriBase)
        ERC721Full('TrophyToken', 'TROPH')
        public
    {
        tokenPrice = _tokenPrice;
        uriBase = _uriBase;
        escrow = new Escrow();
    }

    function mint(
        address to,
        string calldata title,
        uint256 trophy
    )
        external
        payable
    {
        // Minting is free for the owner
        if (msg.sender != owner()) {
            require(msg.value >= tokenPrice);
        }

        if (msg.value > 0) {
            escrow.deposit.value(msg.value)(owner());
        }

        uint256 tokenId = getNextTokenId();

        _mint(to, tokenId);

        titles[tokenId] = title;
        trophies[tokenId] = trophy;

        string memory tokenIdString = uintToString(tokenId);
        string memory uri = string(abi.encodePacked(uriBase, tokenIdString));
        _setTokenURI(tokenId, uri);
    }

    function setTokenPrice(uint256 _tokenPrice) external onlyOwner {
        tokenPrice = _tokenPrice;
    }

    function withdraw() external onlyOwner {
        escrow.withdraw(address(uint160(owner())));
    }

    function setURIBase(string calldata _uriBase) external onlyOwner {
        uriBase = _uriBase;
    }

    function getEscrowBalance() external view onlyOwner returns (uint256) {
        return escrow.depositsOf(owner());
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

    function uintToString(uint256 i) internal pure returns (string memory) {
        if (i == 0) {
            return '0';
        }

        uint256 j = i;
        uint256 len;

        while (j != 0) {
            len++;
            j /= 10;
        }

        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;

        while (i != 0) {
            bstr[k--] = byte(uint8(48 + i % 10));
            i /= 10;
        }

        return string(bstr);
    }
}
