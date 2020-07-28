module.exports = (obj) => {
return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <style>
         .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 18px;
         line-height: 24px;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .invoice-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .invoice-box table tr td:nth-child(2) {
         text-align: left;
         }
         .invoice-box table tr.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
      </style>
   </head>
   <body>
      <div class="invoice-box">
        <table>
            <tr>
               <td class="title"><img src="https://www.greenatom.ru/upload/iblock/65a/65af64c028b740876373ff80bce660a6.gif"
                  style="width:50%; max-width:100px;"></td>
               <td>
                  <h1>План адаптации</h1>
                  Создан: ${obj.date_creation}
               </td>
            </tr>
         </table>
         <table cellpadding="0" cellspacing="0">
            <tr class="item">
               <td>ФИО сотрудника:</td>
               <td>${obj.name}</td>
            </tr>
            <tr class="item">
               <td>Должность:</td>
               <td>${obj.position}</td>
            </tr>
            <tr class="item">
               <td>Руководитель:</td>
               <td>${obj.super}</td>
            </tr>
            <tr class="item">
                <td>HR-менеджер:</td>
                <td>${obj.hr}</td>
             </tr>
             <tr class="item">
                <td>Период:</td>
                <td>${obj.date_start} - ${obj.date_end}</td>
             </tr>
             <tr class="item">
                <td>Этап:</td>
                <td>${obj.step}</td>
             </tr>
             <tr class="item">
                <td>Итог:</td>
                <td>${obj.result}</td>
             </tr>
             <tr class="item">
                <td>Оценка:</td>
                <td>${obj.grade}</td>
             </tr>
         </table>
        </div>
   </body>
</html>
    `;
};
