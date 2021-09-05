import Component from '@glimmer/component';
import Model from '@ember-data/model';

interface Args {
  records: Model[]
  selectPage: Function
}

export default class UiPaginationComponent extends Component<Args> {
  // Defaults
  defaultVisiblePages = 7;


  // Getter, setter and computed properties
  get pagination() {
    // @ts-ignore
    return this.args.records.meta.pagination;
  }

  get currentPage() {
    return this.pagination.current || 1;
  }

  get firstPage() {
    return this.pagination.first || 1;
  }

  get lastPage() {
    return this.pagination.last || this.currentPage;
  }

  get rangeStart() {
    let rangeStart = this.currentPage - Math.floor(this.visiblePages / 2);

    if (rangeStart < 1) {
      return 1;
    }

    if (rangeStart + this.visiblePages > this.lastPage) {
      return this.lastPage - this.visiblePages + 1;
    }

    return rangeStart;
  }

  get rangeEnd() {
    return this.rangeStart + this.visiblePages - 1;
  }

  get showFirstPage() {
    return this.rangeStart > 1;
  }

  get showStartMore() {
    return this.rangeStart > 2 && (this.pagination.pages > 8);
  }

  get showLastPage() {
    return this.rangeEnd < this.lastPage;
  }

  get showEndMore() {
    return this.rangeEnd < this.lastPage - 1 && (this.pagination.pages > 8);
  }

  get visiblePages() {
    if (this.lastPage < this.defaultVisiblePages) {
      return this.lastPage;
    }

    return this.defaultVisiblePages;
  }

  get pages() {
    let start = this.rangeStart;
    let visiblePages = this.visiblePages

    if (this.lastPage > this.defaultVisiblePages) {
      if (!this.showFirstPage) {
        visiblePages++;
      }

      if (!this.showStartMore) {
        visiblePages++;
      }

      if (!this.showLastPage) {
        visiblePages++;
        start--;
      }

      if (!this.showEndMore) {
        visiblePages++;
        start--;
      }
    }

    return Array.from({length: visiblePages}, (_, i) => start + i);
  }
}
