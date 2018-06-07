$(document).ready(function(){
    //pega valor do LocalStorage e converte para um objeto json
    let TabelaCores = localStorage.getItem('TabelaCores');
    TabelaCores = JSON.parse(TabelaCores ? TabelaCores : '{}');

    /* Verifica se  tem valor no localstorage , caso tenha pega o valor e seta nos range*/
    if ($.isEmptyObject(TabelaCores)){
        TabelaCores = {
            "box1":{0:0,1:0,2:0},
            "box2":{0:0,1:0,2:0},
            "box3":{0:0,1:0,2:0}
        };        
    } else{
        $('.content .box').each((ind, element)=> {
            $('#'+$(element).attr('id')+' .PainelRanges .AligitensPainel').each((index, e)=> {            
                let inputVal = TabelaCores[$(element).attr('id')][index];
                $(e).find('input').val(inputVal);
                setaCor($(e).find('input'));            
            });
        });
    }


    $(document).on('input', "input[type='range']", function(e) {
        setaCor($(e.target));
    });
    
    function setaCor(e) {
        //sobe 4 elementos até chegar no box
        let sectionID = e.parent().parent().parent().parent().attr('id');    
        //pega o proximo elemento, no caso range
        e.next().html(e.val());
        
        //seta o valor do range no local storage
        TabelaCores[sectionID][e.parent().index()] = e.val();   

        BackElement(e.parent(), sectionID);
        
    }
    
    //salva no localStorage
    $(document).on('click', "button", function(e){
        if (! $.isEmptyObject(TabelaCores)){
            localStorage.setItem('TabelaCores', JSON.stringify(TabelaCores)); 
        };
    });   

    /*aqui eu mitei
    função recursiva pra acha o box e setar o RGB*/
    function BackElement(e, sectionID){ 
        if (e.attr('id') === sectionID) {
            $(`#${sectionID}`).css('background-color', "rgb("+TabelaCores[sectionID][0]+"," + TabelaCores[sectionID][1] + "," + TabelaCores[sectionID][2] + ")" );
        } else{     
            BackElement(e.parent(), sectionID);
        }    
    };

    
    
    $(document).on('click', '.box', function(e) {
        if ($(e.currentTarget).hasClass('active')) return;

        $('.box').removeClass('active');
        $(e.currentTarget).addClass('active');

        $('.box .painel').removeClass('active');
        $(e.currentTarget).find('.painel').addClass('active');
    });
    
});
 