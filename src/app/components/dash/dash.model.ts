import { format } from 'date-fns';

export class CabinetModel {
  public cards: any = {};
  public phones: any = [
    {
      name: 'пер. Руставели, 4а',
      phone: '(057) 725-57-07'
    },
    {
      name: 'филиал пр. Гагарина, 174, к.2',
      phone: '(057) 725-57-12'
    },
    {
      name: 'филиал ул. Вокзальная, 10',
      phone: '(057) 725-57-13'
    },
    {
      name: 'филиал пер. Плетневский, 7',
      phone: '(057) 725-57-10'
    },
    {
      name: 'амбулаторий ул. Тернопольская, 21 (пос. Жихарь)',
      phone: '(057) 725-12-09'
    }
  ];
  
  constructor(cards: any) {
    this.cards = cards;
  }
}

export class CabinetFormModel {
  public title: string = '';
  public content: string = '';
  public cols: number = 0;
  public rows: number = 0;
}
