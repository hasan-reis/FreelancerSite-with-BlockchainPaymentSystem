let account;

async function connectWallet() {
  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementById('account-info').textContent = `Cüzdan Adresi: ${account}`;
    document.getElementById('connect-button').textContent = 'Bağlandı';
  } catch (error) {
    console.error(error);
  }
}

async function sendMoney() {
  if (!account) {
    alert('Öncelikle Cüzdanınızı Bağlayın');
    return;
  }

  const recipientAddress = document.getElementById('recipient-address').value;
  const amount = document.getElementById('amount').value;

  if (!recipientAddress || !amount) {
    alert('Lütfen alıcı adresini ve tutarını belirtin.');
    return;
  }

  try {
    const transactionParam = {
      to: recipientAddress,
      from: account,
      value: amount,
      token: '0x8046dc0CF65337c8a95D0AbF99749451bbb34193'
    };

    await ethereum.request({ method: 'eth_sendTransaction', params: [transactionParam] });

    alert(`${recipientAddress} Adresine ${amount} TRC Başarıyla Yollandı`);
  } catch (error) {
    console.error(error);

    if (error.code === 4001) {
      alert('Kullanıcı tarafından işlem iptal edildi!');
    } else {
      alert('İşlem başarısız. Lütfen alıcı adresini ve bakiyenizi kontrol edin.');
    }
  }
}
