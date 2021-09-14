var submitBtn = document.getElementById('submit');
var gamertagInput = document.getElementById('gamertag');
var platformInput = document.getElementById('platform');
var result = document.querySelector('.result');

const fetchPlayers = async (gamertag, platform) => {
    const api_call = await fetch(`https://api.fortnitetracker.com/v1/profile/${platform}/${gamertag}`, {
        headers: {
            'TRN-Api-Key': '1072d492-c9ac-4c9f-bcab-66bf115b0df6'
        }
    });

    const data = await api_call.json();
    return { data }
};

const showData = () => {
    fetchPlayers(gamertagInput.value, platformInput.value).then((res) => {
        const markup = `
            <div class="stats text-center">
                <h1>${res.data.epicUserHandle} (${res.data.platformNameLong})</h1>
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.lifeTimeStats[8].value}</h5>
                            <h6>Wins</h6>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.lifeTimeStats[10].value}</h5>
                            <h6>Kills</h6>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="stat">
                            <h5>${res.data.lifeTimeStats[7].value}</h5>
                            <h6>Matches Played</h6>
                        </div>
                    </div>
                </div>
            </div>
        `;
        result.insertAdjacentHTML('beforeend', markup);
    })
        .catch(err => console.log(err));
};

const clearField = () => {
    gamertagInput.value = '';
    platformInput.value = 'Choose Platform';
};

const clearPlayer = () => {
    result.innerHTML = '';
}

submitBtn.addEventListener('click', function () {
    showData();
    clearField();
    clearPlayer();
});
