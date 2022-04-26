import { Component, Input, OnInit,ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubHeaderComponent implements OnInit{

  @Input() create!: () => void;
  @Input() update!: () => void;
  @Input() delete!: () => void;
  @Input() export_all!: () => void;
  @Input() page$!:Observable<string>

  constructor() { }

  ngOnInit(): void {
  }


}
