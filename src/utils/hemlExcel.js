import XLXS from "xlsx";
import FileSaver from "file-saver";

const htmlExcel = {
    getExcel(dom,tittle="默认标题",){
        var excelTittle = tittle;
        var wb = XLXS.utils.table_to_book(document.querySelector(dom));
        var wbout = XLXS.write(wb, {
                            bookType: "xlsx",
                            bookSST: true,
                            type: "array",
                                });
                                try {
    FileSaver.saveAs(
      new Blob([wbout], {
        type: "application/octet-stream",
      }),
      excelTittle+".xlsx"
    );
  } catch (e) {
    console.log(e);
  }
  return wbout;
    }
}

export default htmlExcel;