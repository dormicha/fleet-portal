import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "./document.entity";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentsRepo: Repository<Document>
  ) {}

  create(dto: CreateDocumentDto) {
    const document = this.documentsRepo.create(dto);
    return this.documentsRepo.save(document);
  }

  findAll(tenantId: string) {
    return this.documentsRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const document = await this.documentsRepo.findOne({ where: { id, tenantId } });
    if (!document) {
      throw new NotFoundException("Document not found");
    }
    return document;
  }

  async update(id: string, tenantId: string, dto: UpdateDocumentDto) {
    const document = await this.findOne(id, tenantId);
    Object.assign(document, dto);
    return this.documentsRepo.save(document);
  }

  async remove(id: string, tenantId: string) {
    const document = await this.findOne(id, tenantId);
    await this.documentsRepo.remove(document);
    return { deleted: true };
  }
}
